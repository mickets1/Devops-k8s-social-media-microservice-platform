import express from 'express'
import { Controller } from '../controllers/controller.js'
const controller = new Controller()

export const router = express.Router()

router.get('/test-pedigree', (req, res, next) => controller.testPedigree(req, res, next))
router.get('/:userId', (req, res, next) => controller.findUserPedigree(req, res, next))
router.post('/new-lit', (req, res, next) => controller.updatePedigreeWithNewLit(req, res, next))
router.get('/all-pedigree', (req, res, next) => controller.getAll(req, res, next))

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

