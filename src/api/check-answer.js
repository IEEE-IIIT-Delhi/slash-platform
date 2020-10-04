import * as constants from '../constants'
import AnswerLogs from '../models/answer-logs'
import Question from '../models/question'
import Player from '../models/player'

export default async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const { username, level, _id } = req.user
  const { answer } = req.body
  const invalid = !constants.ANSWER_REGEX.test(answer)

  // Create attempt log
  AnswerLogs.create({ username, level, answer, invalid })

  if (invalid) {
    return res.json({
      success: false,
      message: constants.ERR_INVALID_ANS
    })
  }

  // Check attempt
  const { answer: correctAnswer } = Question.findOne({ level }).exec()

  if (answer !== correctAnswer) {
    return res.json({
      success: false,
      message: constants.ERR_WRONG_ANS
    })
  }

  // It's correct
  const player = await Player.findOne({ _id })

  if (!player) {
    return res.json({
      success: false,
      message: constants.ERR_NO_PLAYER
    })
  }

  player.level += 1
  player.lastLevelOn = new Date()
  player.save()

  return res.json({
    success: true,
    message: constants.CORRECT_ANS
  })
}
