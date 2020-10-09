import * as constants from '../constants'
import AnswerLogs from '../models/answer-logs'
import Question from '../models/question'
import Player from '../models/player'
import Config from '../models/config'

export default async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  // check whether game has ended
  const config = await Config.findOne()
  if (config.ended) {
    return res.json({
      success: false,
      ended: true,
      message: constants.HUNT_END
    })
  }

  const { username, level } = req.user
  const { answer } = req.body
  const invalid = !constants.ANSWER_REGEX.test(answer)

  // Create attempt log
  await AnswerLogs.create({ username, level, answer, invalid })

  console.log(`${Date.now()}: Attempt: ${username} @ L${level} :: ${answer}`)

  if (invalid) {
    return res.json({
      success: false,
      message: constants.ERR_INVALID_ANS
    })
  }

  // Check attempt
  const { answer: correctAnswer } = await Question.findOne({ level })

  if (answer !== correctAnswer) {
    return res.json({
      success: false,
      message: constants.ERR_WRONG_ANS
    })
  }

  // It's correct
  const player = await Player.findOne({ username })

  if (!player) {
    return res.json({
      success: false,
      message: constants.ERR_NO_PLAYER
    })
  }

  if (player.disqualified) {
    return res.json({
      success: false,
      disqualified: true,
      message: constants.ERR_PLAYER_DQ
    })
  }

  player.level = level + 1
  player.lastLevelOn = new Date()
  await player.save()

  console.log(`${Date.now()}: Correct: ${username} @ L${level} :: ${answer}`)

  return res.json({
    success: true,
    message: constants.CORRECT_ANS
  })
}
