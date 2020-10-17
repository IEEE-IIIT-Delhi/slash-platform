import mongoose from 'mongoose'

const LogSchema = new mongoose.Schema({
  type: String,
  key: String,
  value: String,
  time: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Log', LogSchema)
