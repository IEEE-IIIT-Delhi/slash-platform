import mongoose from 'mongoose'

const LogsSchema = new mongoose.Schema({
  admin: String,
  action: String,
  message: String,
  time: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Admin Logs', LogsSchema)
