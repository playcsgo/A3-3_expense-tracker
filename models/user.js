const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('record_user', userSchema)