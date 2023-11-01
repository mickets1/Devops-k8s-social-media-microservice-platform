import express from 'express'
import { Controller } from '../controllers/controller.js'
const controller = new Controller()

export const router = express.Router()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/users', controller.getAllUsers)
router.get('/test-auth', controller.testAuth)

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
