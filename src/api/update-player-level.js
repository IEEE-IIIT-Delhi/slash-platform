import * as constants from '../constants'
import { clearKey } from '../cache'
import { log } from '../utils'
import Player from '../models/player'
import AdminLogs from '../models/admin-logs'

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

  clearKey('leaderboard')
  log('Admin: player level updated', username)

  await AdminLogs.create({
    admin: req.user.username,
    action: 'update-player-level',
    message: `${username}'s level changed: ${level} --> ${newLevel}`
  })

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
