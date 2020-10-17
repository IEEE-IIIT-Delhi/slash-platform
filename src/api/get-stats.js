import * as constants from '../constants'
import Player from '../models/player'
import Question from '../models/question'
import Log from '../models/log'

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const playerCount = await Player.countDocuments({ admin: false })
  const adminCount = await Player.countDocuments({ admin: true })
  const answerAttempts = await Log.countDocuments({ type: 'ANSWER', key: 'Attempt' })
  const lastTenRegistrants = await Log
    .find({ type: 'AUTH', key: 'Registered' }, { _id: 0, value: 1, time: 1 })
    .sort('-time')
    .limit(10)

  const playersPerLevel = []
  const numberOfLevels = await Question.countDocuments()
  for (let level = 0; level < numberOfLevels; level++) {
    playersPerLevel.push(await Player.countDocuments({ level }))
  }

  const countries = await Player.find().distinct('geo.country')
  const cities = await Player.find().distinct('geo.city')

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: {
      playerCount,
      adminCount,
      answerAttempts,
      lastTenRegistrants,
      playersPerLevel,
      geo: { countries, cities }
    }
  })
}
