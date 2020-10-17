import * as constants from '../constants'
import { clearCache } from '../cache'
import { log } from '../utils'
import Player from '../models/player'

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

  clearCache('leaderboard')
  log('ADMIN', `[${req.user.username}] Promoted to admin`, username)

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
