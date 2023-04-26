const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name:{type: String, required: true},
  date:{type: Date, required: true},
  amount: {type: Number, required: true},
  categoryId: {type: Number, required: true},
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'record_user',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('record', recordSchema)