const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employerJobSchema = new Schema(
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
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    budget: {
      type: Number,
      require: true,
      trim: true
    },
    duration: {
        type: Number,
        trim: true
    },
    timeRequirement: {
        type: Number,
        trim: true
    },  
    projectFile: {
      type: String,
      trim: true
    },
    employer: {
        type: Schema.Types.ObjectId,
        ref: 'employer'
    }
  },
  { timestamps: true }
);

const EmployerJob = mongoose.model('employerJob', employerJobSchema)

module.exports = EmployerJob