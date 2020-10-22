import * as constants from '../src/constants'
import { clearCache } from '../src/cache'
import { log, hash } from '../src/utils'
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
      reload: true,
      message: constants.HUNT_END
    })
  }

  const { username } = req.user
  const { answer, timeString } = req.body
  const invalid = !constants.ANSWER_REGEX.test(answer)

  const player = await Player.findOne({ username })
  const { level } = player

  if (!player) {
    return res.json({
      success: false,
      message: constants.ERR_NO_PLAYER
    })
  }

  if (player.disqualified) {
    return res.json({
      success: false,
      reload: true,
      message: constants.ERR_PLAYER_DQ
    })
  }

  log('ANSWER', 'Attempt', `${username} @ L${level}: ${answer}`)

  if (invalid) {
    return res.json({
      success: false,
      message: constants.ERR_INVALID_ANS
    })
  }

  // Exceptional level
  if (level === -1) {
    if (!timeString.startsWith(answer)) {
      return res.json({
        success: false,
        message: constants.ERR_WRONG_ANS
      })
    }
  } else {
    // Regular level
    const { answer: correctAnswer } = await Question.findOne({ level })
    const hashedAttempt = hash(answer.toLowerCase())

    if (hashedAttempt !== correctAnswer) {
      return res.json({
        success: false,
        message: constants.ERR_WRONG_ANS
      })
    }
  }

  // It's correct
  player.level = level + 1
  player.lastLevelOn = new Date()
  await player.save()

  log('ANSWER', 'Correct', `${username} @ L${level}: ${answer}`)
  clearCache('leaderboard')

  return res.json({
    success: true,
    message: constants.CORRECT_ANS
  })
}
