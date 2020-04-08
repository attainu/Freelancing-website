const { Router } = require('express')
const passport = require('passport')
const { register, login, showFreelancerData } = require('../../controllers/normalControllers/freelancerControllers')

const router = Router()

router.post('/register', register)

router.post(
  '/login',
  passport.authenticate('freelancer-local', { session: false }),
  login
)

router.get(
  '/profile',
  passport.authenticate('freelancer-jwt', { session: false }),
  showFreelancerData
)

module.exports = router
