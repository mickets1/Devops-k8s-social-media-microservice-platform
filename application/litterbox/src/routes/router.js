import express from 'express'
import { Controller } from '../controllers/controller.js'
const controller = new Controller()

export const router = express.Router()

router.get('/test-litterbox', controller.testLitterbox)
router.get('/:userId', (req, res, next) => controller.findUserLitterbox(req, res, next))

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
