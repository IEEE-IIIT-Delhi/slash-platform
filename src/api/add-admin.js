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

  const { username } = req.body
  const player = await Player.findOne({ username })

  if (!player) {
    return res.json({
      success: false,
      message: constants.ERR_NO_PLAYER
    })
  }

  player.admin = true
  await player.save()

  clearKey('leaderboard')
  log('Admin: promoted to admin', username)

  await AdminLogs.create({
    admin: req.user.username,
    action: 'add-admin',
    message: `${username} promoted to admin`
  })

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
