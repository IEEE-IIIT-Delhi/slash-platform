import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const PlayerSchema = new mongoose.Schema({
  username: String,
  email: String,
  name: String,
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
  geo: {
    country: String,
    city: String,
    org: String
  }
})

PlayerSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Player', PlayerSchema)
