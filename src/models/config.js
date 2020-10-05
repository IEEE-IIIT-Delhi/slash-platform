import mongoose from 'mongoose'

const ConfigSchema = new mongoose.Schema({
  started: Boolean,
  ended: Boolean,
  startDate: Date
})

export default mongoose.model('Config', ConfigSchema, 'config')
