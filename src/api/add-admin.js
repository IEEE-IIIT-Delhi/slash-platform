import * as constants from '../constants'
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
    res.json({
      success: false,
      message: constants.ERR_NO_PLAYER
    })
  }

  player.admin = true
  player.save()

  AdminLogs.create({
    admin: req.user.username,
    action: 'add-admin',
    message: `${req.body.username} promoted to admin`
  })

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
