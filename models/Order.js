const mongoose = require('mongoose')
const Schema = mongoose.Schema


const orderSchema = new Schema(
  {
    freelancer: { 
        type: Schema.Types.ObjectId, 
        ref: 'freelancer'},
    employer: { 
        type: Schema.Types.ObjectId, 
        ref: 'employer'},
    isCompleted: {
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
)

const Order = mongoose.model('order', orderSchema)

module.exports = Order