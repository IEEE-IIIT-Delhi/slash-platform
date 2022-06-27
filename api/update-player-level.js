import * as constants from '../src/constants'
import { clearCache } from '../src/cache'
import { log } from '../src/utils'
import Player from '../models/player'

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const { username, newLevel } = req.body
  const player = await Player.findOne({ username })
  const { level } = player

  if (!player) {
    return res.json({
      success: false,
      message: constants.ERR_NO_PLAYER
    })
  }

  player.level = newLevel
  player.lastLevelOn = new Date()
  await player.save()

  clearCache('leaderboard')
  log(
    'ADMIN',
    `[${req.user.username}] Player level updated`,
    `${username}: ${level} -> ${newLevel}`
  )

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
