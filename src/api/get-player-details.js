import * as constants from '../constants'
import Player from '../models/player'
import RegistrationLogs from '../models/registration-logs'

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

  const { time } = await RegistrationLogs.findOne({ username })
  player.registrationDate = new Date(time)

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { player }
  })
}
