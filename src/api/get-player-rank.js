import * as constants from '../constants'
import Player from '../models/player'

export default async (req, res) => {
  const { user: player } = req
  if (!player) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const leaderboard = await Player
    .find({ admin: false })
    .sort('-level')
    .sort('lastLevelOn')
    .exec()
  const rank = leaderboard.indexOf(player.username) + 1

  if (rank === 0) {
    return res.json({
      success: false,
      message: constants.ERR_NO_PLAYER
    })
  }

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { rank }
  })
}
