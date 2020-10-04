import * as constants from '../constants'
import Player from '../models/player'

export default async (req, res) => {
  const leaderboard = await Player
    .find({ admin: false })
    .sort('-level')
    .sort('lastLevelOn')
    .exec()

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { leaderboard }
  })
}
