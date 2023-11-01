import express from 'express'
import { Controller } from '../controllers/controller.js'
const controller = new Controller()

export const router = express.Router()
console.log('in router follow-service')

router.post('/follow', controller.createNewFollower)
router.post('/unfollow', controller.unFollower)
router.get('/get-followers/:userId', controller.getAllFollowersForUser)

router.get('/all-followers', controller.getAllFollowers)
router.get('/test-follow', controller.testFollow)

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
