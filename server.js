const express = require('express')
const passport = require('passport')
const dotenv = require('dotenv')
dotenv.config()
require('./db')
require('./passport')

const freelancerRoutes = require('./routes/freelancerRoutes')
const employerRoutes = require('./routes/employerRoutes')

const app = express()

app.use(express.json())
app.use(passport.initialize())

app.use(freelancerRoutes)
app.use(employerRoutes)

app.listen(3000, function() {
  console.log('Server started')
})
