import * as constants from '../constants'
import Player from '../models/player'
import Config from '../models/config'

export default async (req, res) => {
  const config = await Config.findOne().cache({ key: 'config' })

  let leaderboard = await Player.find(
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

  if (!config.ended && (!req.user || !req.user.admin)) {
    leaderboard = leaderboard.slice(0, constants.MAX_LEADERBOARD_PLAYERS)
  }

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { leaderboard }
  })
}
