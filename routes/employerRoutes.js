const { Router } = require('express')
const passport = require('passport')
const { register, login, showEmployerData } = require('../controllers/employerControllers.js')

const router = Router()

router.post('/employerRegister', register)

router.post(
  '/employerLogin',
  passport.authenticate('employer-local', { session: false }),
  login
)

router.get(
  '/employerProfile',
  passport.authenticate('employer-jwt', { session: false }),
  showEmployerData
)

module.exports = router