import * as constants from '../constants'
import Player from '../models/player'

export default async (req, res) => {
  const leaderboard = await Player.find(
    {
      admin: false,
      disqualified: false
    }, {
      _id: 0,
      username: 1,
      level: 1
    }, {
      sort: {
        level: -1,
        lastLevelOn: 1
      }
    }
  ).cache({ key: 'leaderboard' })

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { leaderboard }
  })
}
