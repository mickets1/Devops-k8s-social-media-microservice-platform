import { sendData } from '../utils/rabbitmq.js'
import { Util } from '../utils/util.js'
const util = new Util()

// TODO: Uncomment this when running in kubernetes
const pedigreeServiceUrl = 'http://pedigree.default.svc.cluster.local:8895'
const followServiceUrl = 'http://follow.default.svc.cluster.local:8896'
const litServiceUrl = 'http://lit.default.svc.cluster.local:8897'
const litterBoxServiceUrl = 'http://litterbox.default.svc.cluster.local:8899'
const authServiceUrl = 'http://auth.default.svc.cluster.local:8893'
const userServiceUrl = 'https://httpbin.org/json'

// TODO: Comment this when running in kubernetes
// const pedigreeServiceUrl = 'http://localhost:3300'
// const followServiceUrl = 'http://localhost:3200'
// const litServiceUrl = 'http://localhost:3400'
// const litterBoxServiceUrl = 'http://localhost:3500'
// const authServiceUrl = 'http://localhost:3100'
// const userServiceUrl = 'https://httpbin.org/json'

export class Controller {
  // When a new lit is posted post the lit to the NEW-LIT-QUEUE
  async createLit(req, res, next) {
    try {
      // Get followers for user that created lit so we later can know what Litterboxes that should be updated with the new lit
      let followersForUser = await fetch(
        followServiceUrl + '/get-followers/' + req.body.userId
      )
      followersForUser = await followersForUser.json()
      console.log(followersForUser, ' returned followers')
      // Create the lit with the lit info and the followers of the sender
      const lit = {
        userId: req.body.userId,
        description: req.body.description,
        followers: followersForUser,
      }
      // Send the lit to the NEW-LIT queue
      await sendData(lit)
      res.status(200).json({
        message: 'Lit was sent',
      })
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  // When a user follows another user
  async follow(req, res, next) {
    try {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theOneWhoWantsToFollow: req.body.theOneWhoWantsToFollow,
          theOneToFollow: req.body.theOneToFollow,
        }),
      }
      let response = await fetch(followServiceUrl + '/follow', postOptions)

      response.status === 409
        ? res.status(409).json({ message: 'Already following' })
        : res.status(200).json({ message: 'New follow' })
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  // When a user unfollows another user
  async unFollow(req, res, next) {
    try {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theOneWhoWantsToUnFollow: req.body.theOneWhoWantsToUnFollow,
          theOneToUnFollow: req.body.theOneToUnFollow,
        }),
      }
      let response = await fetch(followServiceUrl + '/unfollow', postOptions)
      res.status(200).json({
        message: 'New unfollow',
      })
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  //! baseurl +  "/" is ok?
  async getUserPedigree(req, res, next) {
    console.log(req.body, 'req pedigree')
    try {
      const response = await fetch(pedigreeServiceUrl + '/' + req.params.userId)
      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async getUserLitterbox(req, res, next) {
    try {
      let response = await fetch(litterBoxServiceUrl + '/' + req.params.userId)
      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async getAllPedigrees(req, res, next) {
    try {
      let response = await fetch(pedigreeServiceUrl + '/all-pedigree')
      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async getAllFollowers(req, res, next) {
    try {
      let response = await fetch(
        followServiceUrl + '/get-followers/' + req.params.userId
      )
      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  //! Get all users
  async getAllUsers(req, res, next) {
    try {
      let response = await fetch(authServiceUrl + '/users')

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async authRegister(req, res, next) {
    try {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
        }),
      }

      let response = await fetch(authServiceUrl + '/register', postOptions)

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async authLogin(req, res, next) {
    console.log(req.body, ' authlogin gateway')
    try {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: req.body.username,
          password: req.body.password,
        }),
      }

      const response = await fetch(authServiceUrl + '/login', postOptions)

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async logout(req, res, next) {
    try {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: req.body.username,
          password: req.body.password,
        }),
      }

      let response = await fetch(userServiceUrl + '/logout', postOptions)

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async listLits(req, res, next) {
    try {
      const response = await fetch(litServiceUrl + '/list')
      // console.log(response)

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async listLitterboxLits(req, res, next) {
    try {
      let response = await fetch(litterBoxServiceUrl + '/list')

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async listLitsOfUser(req, res, next) {
    try {
      let response = await fetch(
        litServiceUrl + '/list-lits-of-user/' + req.params.userId
      )

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  // Tests
  async testAuth(req, res, next) {
    try {
      let response = await fetch(authServiceUrl + '/test-auth')

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testLitterbox(req, res, next) {
    try {
      let response = await fetch(litterBoxServiceUrl + '/test-litterbox')

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testLit(req, res, next) {
    try {
      let response = await fetch(litServiceUrl + '/test-lit')

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testFollow(req, res, next) {
    try {
      let response = await fetch(followServiceUrl + '/test-follow')

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testPedigree(req, res, next) {
    try {
      let response = await fetch(pedigreeServiceUrl + '/test-pedigree')

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testUser(req, res, next) {
    try {
      let response = await fetch(userServiceUrl)
      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testFollow(req, res, next) {
    try {
      let response = await fetch(followServiceUrl + '/all-followers')
      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testAuth(req, res, next) {
    try {
      let response = await fetch(authServiceUrl + '/test-auth')

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testLitterbox(req, res, next) {
    try {
      let response = await fetch(litterBoxServiceUrl + '/test')
      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async testLit(req, res, next) {
    try {
      let response = await fetch(litServiceUrl + '/test-lit')

      res.status(200).json(await response.json())
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }
}
