const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const Schema = mongoose.Schema


const freelancerSchema = new Schema(
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
      required: true,
      trim: true
    },
    accessToken: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
)

freelancerSchema.statics.findByEmailAndPassword = async (email, password) => {
  try {
    const freelancer = await Freelancer.findOne({ email: email })
    if (!freelancer) throw new Error('Incorrect Credentials')
    const isMatched = await bcrypt.compare(password, freelancer.password)
    if (!isMatched) throw new Error('Incorrect Credentials')
    return freelancer
  } catch (err) {
    err.name = 'AuthError'
    throw err
  }
}

freelancerSchema.methods.generateToken = async function() {
  const freelancer = this
  const accessToken = sign({ id: freelancer._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '12h'
  })
  freelancer.accessToken = accessToken
  await freelancer.save()
  return accessToken
}

freelancerSchema.methods.toJSON = function() {
  const freelancer = this.toObject()
  delete freelancer.password
  delete freelancer.accessToken
  delete freelancer.__v
  return freelancer
}

freelancerSchema.pre('save', async function(next) {
  const freelancer = this
  try {
    if (freelancer.isModified('password')) {
      const hashedPassword = await bcrypt.hash(freelancer.password, 10)
      freelancer.password = hashedPassword
      next()
    }
  } catch (err) {
    console.log(err.message)
    next(err)
  }
})

const Freelancer = mongoose.model('freelancer', freelancerSchema)

module.exports = Freelancer