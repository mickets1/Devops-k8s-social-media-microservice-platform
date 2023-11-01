import { Util } from '../utils/util.js'
import { Litterbox } from '../models/litterbox.js'
const util = new Util()

export class Controller {
  // Return the Litterbox for a user
  async findUserLitterbox (req, res, next) {
    const user = req.params.userId
    const response = await Litterbox.findOne({ userId: user })
    res.status(200).json(response)
  }

  // When a user gets a new follower, the litterbox of the follower should be updated with all lits posted by the one they started to follow
  async updateLitterboxWithNewFollower(newFollower) {
    const litterboxFollows = await this.getLitterboxForUser(newFollower.follows)
    const litterboxFollower = await this.getLitterboxForUser(newFollower.follower)

    // Go through the Litterbox of the one that should be followed and check for lits made by them, add their lits to the new followers Litterbox
    litterboxFollows.lits.forEach(async l => {
      if (l.userId === newFollower.follows) {
        const lit = {
          userId: l.userId,
          description: l.description,
          litId: l.litId,
          litDate: l.litDate
        }
        litterboxFollower.lits.push(lit)
      }
    })
    await litterboxFollower.save()
    await litterboxFollows.save()
  }

  // Get the Litterbox of a user, or create one if it doesn't excist
  async getLitterboxForUser (user) {
    let litterbox = await Litterbox.findOne({ userId: user })
    if (litterbox === null || litterbox === undefined) {
      litterbox = new Litterbox({
        userId: user,
        lits: []
      })
      return litterbox
    }
    return litterbox
  }

  // Remove the lits in a users Litterbox when the user has been unfollowed
  async removeLitsFromLitterbox (unfollow) {
    const litterbox = await Litterbox.findOne({ userId: unfollow.theOneWhoWantsToUnFollow })

    const updatedLitsArray = []

    // Go through the lits in the Litterbox for theOneWhoWantsToUnFollow, if the lit is NOT made by the theOneToUnFollow push them to the new updatedLitsArray
    litterbox.lits.forEach(async lit => {
      if (lit.userId !== unfollow.theOneToUnFollow) {
        updatedLitsArray.push(lit)
      }
    })

    // The array of lits in the Litterbox should be changed to the new updated array (we did it like this due to problems with saving the original array in the Litterbox between removings of lits)
    litterbox.lits = updatedLitsArray
    await litterbox.save()
  }

  // When a user posts a new lit, the Litterboxes of all those who follow the user must be updated with that lit
  async updateLitterboxWithNewLit (newLit) {
    try {
      const lit = {
        userId: newLit.userId,
        description: newLit.description,
        litId: newLit.litId,
        litDate: newLit.litDate
      }

      const followers = newLit.litFollowers
      let litterbox

      followers.forEach(async f => {
        litterbox = await Litterbox.findOne({ userId: f.userIdFollower })
        if (litterbox === null || litterbox === undefined) {
          litterbox = new Litterbox({
            userId: f.userIdFollower,
            lits: []
          })
        }

        litterbox.lits.push(lit)
        await litterbox.save()
      })
      this.addToOwnLitterbox(lit)
    } catch (error) {
      console.log(error)
    }
  }

  // The Litterbox of the user who posted a new lit should also be updated
  async addToOwnLitterbox (lit) {
    let litterbox = await Litterbox.findOne({ userId: lit.userId })
    if (litterbox === null || litterbox === undefined) {
      litterbox = new Litterbox({
        userId: lit.userId,
        lits: []
      })
    }

    litterbox.lits.push(lit)
    await litterbox.save()
  }

  async testLitterbox (req, res, next) {
    try {
      
      res.status(200).json({
        message: 'LITTERBOX CONTROLLER ACTIVATED'
      })
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }
}
