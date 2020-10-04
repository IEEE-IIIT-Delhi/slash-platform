import mongoose from 'mongoose'

const LogsSchema = new mongoose.Schema({
  username: String,
  time: {
    type: Date,
    default: new Date()
  }
})

export default mongoose.model('Registration Logs', LogsSchema)
