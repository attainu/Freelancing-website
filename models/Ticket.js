const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
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
  },
  { timestamps: true }
);

const Ticket = mongoose.model('ticket', ticketSchema)

module.exports = Ticket