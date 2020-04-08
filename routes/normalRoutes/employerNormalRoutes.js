const { Router } = require('express')
const passport = require('passport')
const { register, login, updateAccount, deleteAccount } = require('../../controllers/normalControllers/employerNormalControllers')

const router = Router()

router.post('/employer/register', register)

router.post(
  '/employer/login',
  passport.authenticate('employer-local', { session: false }),
  login
)

router.patch(
  '/employer/update/:employerid',
  passport.authenticate('employer-jwt', { session: false }),
  updateAccount
)

router.delete(
  '/employer/delete/:employerid',
  passport.authenticate('employer-jwt', { session: false }),
  deleteAccount
)

module.exports = router