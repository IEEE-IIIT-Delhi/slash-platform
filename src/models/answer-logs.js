import mongoose from 'mongoose'

const LogsSchema = new mongoose.Schema({
  username: String,
  level: Number,
  answer: String,
  invalid: Boolean,
  time: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Answer Logs', LogsSchema)
