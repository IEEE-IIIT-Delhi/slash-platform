import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  name: String,
  disqualified: {
    type: Boolean,
    default: false
  },
  level: {
    type: Number,
    default: 0
  },
  lastLevelOn: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  },
  superadmin: {
    type: Boolean,
    default: false
  },
  geo: {
    country: String,
    city: String
  }
})

PlayerSchema.plugin(passportLocalMongoose)

export default mongoose.model('Player', PlayerSchema)
