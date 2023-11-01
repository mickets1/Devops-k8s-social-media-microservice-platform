import { Pedigree } from '../models/pedigree.js'
import { Util } from '../utils/util.js'
const util = new Util()

/**
 *
 */
export class Controller {
  // Get the Pedigree of a user
  async findUserPedigree(req, res, next) {
    try {
      const user = req.params.userId
      const response = await Pedigree.findOne({ userId: user })
      res.status(200).json(response)
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  // When a user posts a new lit, their Pedigree should be updated
  async updatePedigreeWithNewLit(newLit) {
    try {
      let pedigree = await Pedigree.findOne({ userId: newLit.userId })

      // If the user does not have a Pedigree object connected to them yet (if they have not made any lits) it should be created
      if (pedigree === null) {
        console.log('no pedigree was found, creating...')
        pedigree = new Pedigree({
          userId: newLit.userId,
          lits: [],
        })
        await pedigree.save()
      }

      pedigree.lits.push(newLit)
      await pedigree.save()
    } catch (error) {
      console.log(error)
    }
  }

  async testPedigree (req, res, next) {
    try {
      
      res.status(200).json({
        message: 'PEDIGREE CONTROLLER ACTIVATED'
      })
    } catch (error) {
      next(util.handleError(error, 404))
    }
  }

  async getAll(req, res, next) {
    const response = (await Pedigree.find()).map((p) => p.toObject())
    res.status(200).json({ response })
  }
}
