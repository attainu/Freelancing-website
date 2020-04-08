const { Router } = require('express')
const passport = require('passport')
const { register, login, showEmployerData } = require('../../controllers/normalControllers/employerControllers')

const router = Router()

router.post('/employerRegister', register)

router.post(
  '/employerLogin',
  passport.authenticate('employer-local', { session: false }),
  login
)

module.exports = router