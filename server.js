const express = require('express')
const passport = require('passport')
require('dotenv').config()
require('./db')
require('./passport')

const freelancerRoutes = require('./routes/normalRoutes/freelancerRoutes')
const employerRoutes = require('./routes/normalRoutes/employerRoutes')
const freelancerProfileRoutes = require('./routes/apiRoutes/freelancerProfileRoutes')

const app = express()

app.use(express.json())
app.use(passport.initialize())

app.use(freelancerRoutes)
app.use(employerRoutes)
app.use(freelancerProfileRoutes)

app.listen(3000, function() {
  console.log('Server started')
})
