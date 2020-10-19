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

  const { username } = req.body
  const player = await Player.findOne({ username })

  if (!player) {
    return res.json({
      success: false,
      message: constants.ERR_NO_PLAYER
    })
  }

  player.disqualified = true
  await player.save()

  clearCache('leaderboard')
  log('Admin', `[${req.user.username}] Player disqualified`, username)

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
