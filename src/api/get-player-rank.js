import * as constants from '../constants'
import Player from '../models/player'

export default async (req, res) => {
  if (!req.user) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const { username } = req.user

  const leaderboard = await Player.find(
    {
      admin: false,
      disqualified: false
    }, {
      _id: 0,
      username: 1
    }, {
      sort: {
        level: -1,
        lastLevelOn: 1
      }
    }
  ).cache({ key: 'leaderboard_rank' })

  const rank = leaderboard.findIndex(p => p.username === username) + 1

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
