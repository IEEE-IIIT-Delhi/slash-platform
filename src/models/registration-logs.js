import mongoose from 'mongoose'

const LogsSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  time: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Registration Logs', LogsSchema)
