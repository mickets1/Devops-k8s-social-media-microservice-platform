import express from 'express'
import { Controller } from '../controllers/controller.js'
const controller = new Controller()

export const router = express.Router()

router.get('/test-lit', controller.testLit)
router.get('/list', controller.list)
router.post('/create', controller.create)
router.delete('/delete/:litId', controller.delete)

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
