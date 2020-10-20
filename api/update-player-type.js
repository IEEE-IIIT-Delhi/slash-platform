import * as constants from '../src/constants'
import { clearCache } from '../src/cache'
import { log } from '../src/utils'
import Player from '../models/player'

const types = ['admin', 'superadmin', 'phantom', 'disqualifed']

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const { username, type, value } = req.body
  const player = await Player.findOne({ username })

  if (!player) {
    return res.json({
      success: false,
      message: constants.ERR_NO_PLAYER
    })
  }

  if (!types.includes(type)) {
    return res.json({
      success: false,
      message: constants.ERR_MISC
    })
  }

  player[type] = Number(value)
  await player.save()

  clearCache('leaderboard')
  log(
    'ADMIN',
    `[${req.user.username}] Player type changed`,
    `${username}: ${type} -> ${Boolean(Number(value))}`
  )

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
