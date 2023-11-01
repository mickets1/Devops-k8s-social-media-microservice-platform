import express from 'express'
import createError from 'http-errors'
import { Controller } from '../controllers/controller.js'

export const router = express.Router()

const controller = new Controller()

// För att skapa en ny lit
router.post('/create-lit', (req, res, next) =>
  controller.createLit(req, res, next)
)
// För att följa någon
router.post('/follow', (req, res, next) => controller.follow(req, res, next))
router.post('/unfollow', (req, res, next) =>
  controller.unFollow(req, res, next)
)
// För att få ut alla lits i på en users Pedigree sida
router.get('/pedigree/:userId', controller.getUserPedigree)
// För att få ut alla lits i på en users Litterbox sida
router.get('/litterbox/:userId', controller.getUserLitterbox)
// För att få ut en användares följare
router.get('/followers/:userId', (req, res, next) =>
  controller.getAllFollowers(req, res, next)
)

// Test routes
router.get('/test-auth', controller.testAuth)
router.get('/test-lit', controller.testLit)
router.get('/test-follow', controller.testFollow)
router.get('/test-litterbox', controller.testLitterbox)
router.get('/test-pedigree', controller.getAllPedigrees)
router.get('/test-user', controller.testUser)
router.get('/test-pedigree-svc', controller.testPedigree)

// Useful routes
// Lits
router.get('/list-lits', controller.listLits)
router.get('/list-litterbox-lits', controller.listLitterboxLits)

router.get('/list-lits-of-user/:userId', (req, res, next) =>
  controller.listLitsOfUser(req, res, next)
)

// Auth
router.post('/register', controller.authRegister)
router.post('/login', controller.authLogin)
router.post('/logout', controller.logout)
//! Get all users
router.get('/users', controller.getAllUsers)

// Not found route
router.use('*', (req, res, next) => next(createError(404)))
