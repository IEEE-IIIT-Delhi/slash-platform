import * as constants from '../src/constants'
import { clearCache } from '../src/cache'
import { log } from '../src/utils'

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const { key } = req.body
  clearCache(key)

  log('ADMIN', `[${req.user.username}] Cache cleared`, key || 'FLUSH')

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
