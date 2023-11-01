import { Util } from '../utils/util.js'
import { Lit } from '../models/Lit.js'
import { sendLitToQueue } from '../utils/rabbitmq.js'
const util = new Util()

export class Controller {

  async saveConsumedLit (newLit) {
    try {
      const lit = new Lit({
        userId: newLit.userId,
        description: newLit.description
      })

      await lit.save()

      const litForQueue = {
        litId: lit.id,
        userId: lit.userId,
        description: lit.description,
        created: lit.createdAt,
        followers: newLit.followers
      }
      sendLitToQueue(litForQueue)
    } catch (error) {
      console.log(error)
    }
  }

  async testLit (req, res, next) {
    try {
      res.status(200).json({
        message: 'LIT CONTROLLER ACTIVATED'
      })
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async list (req, res, next) {
    try {
      const response = (await Lit.find()).map(lit => lit.toObject())
      res.status(200).json({response})
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async create (req, res, next) {
    try {
      const lit = new Lit({
        userId: req.body.userId,
        description: req.body.description
      })

      await lit.save()

      res.status(200).json(lit)
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async delete (req, res, next) {
    try {
      const lit = await Lit.findById(req.params.litId)
      lit.delete()

      res.status(200).json(lit)
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }
}
