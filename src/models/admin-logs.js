import mongoose from 'mongoose'

const LogsSchema = new mongoose.Schema({
  admin: String,
  action: String,
  message: String,
  time: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Admin Logs', LogsSchema)
