const express = require('express')
const passport = require('passport')
require('dotenv').config()
require('./db')
require('./passport')

const freelancerNormalRoutes = require('./routes/normalRoutes/freelancerNormalRoutes')
const employerNormalRoutes = require('./routes/normalRoutes/employerNormalRoutes')
const freelancerApiRoutes = require('./routes/apiRoutes/freelancerApiRoutes')
const employerApiRoutes = require('./routes/apiRoutes/employerApiRoutes')

const app = express()

app.use(express.json())
app.use(passport.initialize())

app.use(freelancerNormalRoutes)
app.use(employerNormalRoutes)
app.use(freelancerApiRoutes)
app.use(employerApiRoutes)

app.listen(3000, function() {
  console.log('Server started')
})
