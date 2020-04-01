const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const Schema = mongoose.Schema

const employerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: function() {
        return !this.isThirdPartyUser
      },
      trim: true
    },
    isThirdPartyUser: {
      type: Boolean,
      required: true
    },
    accessToken: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
)

employerSchema.statics.findByEmailAndPassword = async (email, password) => {
  try {
    const employer = await Employer.findOne({ email: email })
    if (!employer) throw new Error('Incorrect Credentials')
    const isMatched = await bcrypt.compare(password, employer.password)
    if (!isMatched) throw new Error('Incorrect Credentials')
    return employer
  } catch (err) {
    err.name = 'AuthError'
    throw err
  }
}

employerSchema.methods.generateToken = async function() {
  const employer = this
  const accessToken = sign({ id: employer._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '12h'
  })
  employer.accessToken = accessToken
  await employer.save()
  return accessToken
}

employerSchema.methods.toJSON = function() {
  const employer = this.toObject()
  delete employer.password
  delete employer.accessToken
  delete employer.__v
  return employer
}

employerSchema.pre('save', async function(next) {
  const employer = this
  try {
    if (employer.isModified('password')) {
      const hashedPassword = await bcrypt.hash(employer.password, 10)
      employer.password = hashedPassword
      next()
    }
  } catch (err) {
    console.log(err.message)
    next(err)
  }
})

const Employer = mongoose.model('employer', employerSchema)

module.exports = Employer