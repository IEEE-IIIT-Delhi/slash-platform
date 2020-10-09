import * as constants from '../constants'
import Config from '../models/config'

export default async (req, res) => {
  const config = await Config.findOne().cache({ key: 'config' })

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: { config }
  })
}
