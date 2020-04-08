const mongoose = require('mongoose')
const Schema = mongoose.Schema

const freelancerProfileSchema = new Schema(
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
    services: {
      type: Array,
      default: undefined,
      required: true,
      trim: true
    },
    expertiseLevel: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    skills: {
      type: Array,
      default: undefined,
      required: true,
      trim: true
    },
    education: {
      type: Object,
      trim: true
    },
    employment: {
      type: Object,
      trim: true
    },
    languages: {
      type: Array,
      default: undefined,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    hourlyRate: {
      type: Number,
      require: true,
      trim: true
    },
    profileImage: {
      type: String,
      required: true,
      trim: true
    },
    freelancer: {
      type: Schema.Types.ObjectId,
      ref: 'freelancer'
    }
  },
  { timestamps: true }
);

const FreelancerProfile = mongoose.model('freelancerProfile', freelancerProfileSchema)

module.exports = FreelancerProfile