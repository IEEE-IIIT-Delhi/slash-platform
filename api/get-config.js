import * as constants from '../src/constants'
import Config from '../models/config'

// Config.create({
//   started: false,
//   showLeaderboard: false,
//   ended: false,
//   startDate: new Date(2022, 5, 28)
// })

export default async (req, res) => {
  const config = await Config.findOne({}, { _id: 0 }).cache({
    key: 'config'
  })

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { config }
  })
}
