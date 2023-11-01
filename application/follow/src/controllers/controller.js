import { Util } from '../utils/util.js'
import { Follow } from '../models/follow.js'
import {
  sendNewFollowerToQueue,
  sendUnfollowToQueue,
} from '../utils/rabbitmq.js'
const util = new Util()

export class Controller {
  async getAllFollowersForUser(req, res, next) {
    try {
      // Find the Follow object for the user that should be followed (to return the array of the users followers, where we want to add the new follower)
      let follow = await Follow.findOne({ userId: req.params.userId })

      // If the user does not have any other followers yet, they will not have Follow object connected to their userId
      if (follow === null) {
        follow = new Follow({
          userId: req.params.userId, // The one to follow
          followers: [],
        })
        await follow.save()
      }

      const followers = follow.followers

      res.status(200).json(followers)
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async unFollower(req, res, next) {
    console.log('in unfollower in follow')
    try {
      const follow = await Follow.findOne({ userId: req.body.theOneToUnFollow })

      // Go through the theOneToUnFollow:s followers in order to find the follower that should be removed from the list
      follow.followers.forEach((follower) => {
        if (req.body.theOneWhoWantsToUnFollow === follower.userIdFollower) {
          const indexOfTheOneToRemove = follow.followers.indexOf(follower)
          const theOneToRemove = follow.followers.splice(
            indexOfTheOneToRemove,
            1
          )
          console.log(
            theOneToRemove,
            'the one that should be removed from list'
          )

          // Send theOneToUnFollow and theOneWhoWantsToUnFollow to the UN-FOLLOW queue so that Litterbox svc can consume it and update itself
          sendUnfollowToQueue(req.body)
        }
      })

      await follow.save()

      res.status(200).json({ message: 'You have unfollowed' })
    } catch (error) {
      console.log(error)
    }
  }

  async createNewFollower(req, res, next) {
    try {
      let follow = await Follow.findOne({ userId: req.body.theOneToFollow })

      // If the user does not have any other followers yet, they will not have Follow object connected to their userId
      if (follow === null) {
        console.log('no Follow found, creating...')
        follow = new Follow({
          userId: req.body.theOneToFollow,
          followers: [],
        })
        await follow.save()
      }

      const newFollower = {
        userIdFollower: req.body.theOneWhoWantsToFollow,
      }

      // Check if the user is already a follower
      let isFollowing = false
      for (let i = 0; i < follow.followers.length; i++) {
        if (
          follow.followers[i].userIdFollower === req.body.theOneWhoWantsToFollow
        ) {
          isFollowing = true
          console.log('User is already following')
          res.status(409).send('User is already following')
          return
        }
      }

      // If not, add the user to the list of followers
      if (isFollowing === false || follow.followers.length === 0) {
        console.log('user was not found in followers list')
        follow.followers.push(newFollower)
        await follow.save()
        const follower = {
          follower: req.body.theOneWhoWantsToFollow,
          follows: req.body.theOneToFollow,
        }
        // Send theOneToFollow and theOneWhoWantsToFollow to the NEW-FOLLOWER queue so that Litterbox svc can consume it and update itself
        sendNewFollowerToQueue(follower)
      }
      res.status(200).json({ message: 'You have started to follow' })
    } catch (error) {
      console.log(error)
    }
  }

  // Hämta allt som finns i Follow-model
  async getAllFollowers(req, res, next) {
    try {
      const response = (await Follow.find()).map((f) => f.toObject())
      res.status(200).json({ response })
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  // GET-request
  // När en lit postats, ska en förfrågan skickas till Follow-servicen
  // Kolla upp vilka som följer användaren som postat en lit
  // Responda med en lista
  async delete(req, res, next) {
    try {
      const follow = await Follow.findOne({ userId: req.params.userId })
      follow.delete()
      res.status(200).json(follow)
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testFollow(req, res, next) {
    try {
      res.status(200).json({
        message: 'FOLLOW CONTROLLER ACTIVATED',
      })
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }
}
