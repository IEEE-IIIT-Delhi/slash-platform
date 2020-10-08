import * as constants from '../constants'
import Player from '../models/player'

export default async (req, res) => {
  const rawLeaderboard = await Player
    .find({ admin: false, disqualified: false })
    .sort('-level')
    .sort('lastLevelOn')
    .lean()

  const leaderboard = rawLeaderboard.map(player => ({
    username: player.username,
    level: player.level
  }))

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { leaderboard }
  })
}
