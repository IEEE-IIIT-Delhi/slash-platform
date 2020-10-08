import * as constants from '../constants'
import Config from '../models/config'

export default async (req, res) => {
  const config = await Config.findOne()

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { config }
  })
}
