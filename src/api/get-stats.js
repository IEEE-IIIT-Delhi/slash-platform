import * as constants from '../constants'
import Player from '../models/player'
import Question from '../models/question'
import AnswerLogs from '../models/answer-logs'
import RegistrationLogs from '../models/registration-logs'

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const playerCount = await Player.countDocuments()
  const adminCount = await Player.countDocuments({ admin: true })
  const answerAttempts = await AnswerLogs.countDocuments()
  const lastTenRegistrants = await RegistrationLogs
    .find({})
    .sort('-time')
    .limit(10)
    .exec()

  const playersPerLevel = []
  const numberOfLevels = await Question.countDocuments()
  for (let level = 0; level < numberOfLevels; level++) {
    playersPerLevel.push(await Player.countDocuments({ level }))
  }

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: {
      playerCount,
      adminCount,
      answerAttempts,
      lastTenRegistrants,
      playersPerLevel
    }
  })
}
