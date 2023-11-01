import User from '../models/user.js'
import { Util } from '../utils/util.js'
import bcryptr from 'bcrypt'

/**
 *
 */
export class Controller {
  async testAuth (req, res, next) {
    try {
      res.status(200).json({
        message: 'AUTH CONTROLLER ACTIVATED'
      })
    } catch (error) {
      next(Util.handleError(error, 404))
    }
  }

  async register(req, res) {
    try {
      console.log(req.body)
      const salt = await bcryptr.genSalt(10)
      const hashedPass = await bcryptr.hash(req.body.password, salt)
      console.log(hashedPass)

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
      })

      const user = await newUser.save()
      res.status(200).json(user)
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  }

  async login(req, res) {
    try {
      console.log('auth login')
      const userInput = await User.findOne({ username: req.body.username })

      if (userInput) {
        const passwordInput = await bcryptr.compare(
          req.body.password,
          userInput.password
        )
        console.log('*"""""""""""""""""""""""passwordInput' + passwordInput)

        if (!passwordInput) {
          res.status(400).json('Wrong input!')
        }

        console.log('ok')
        res.status(200).json(userInput)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
