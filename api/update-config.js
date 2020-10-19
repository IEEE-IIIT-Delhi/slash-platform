import Config from '../models/config'
import { clearCache } from '../src/cache'
import { log } from '../src/utils'

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.redirect('/')
  }

  const config = await Config.findOne()
  const { action } = req.body

  switch (action) {
    case 'begin':
      config.started = true
      break
    case 'end':
      config.ended = true
      break
    case 'show-leaderboard':
      config.showLeaderboard = true
      break
    case 'hide-leaderboard':
      config.showLeaderboard = false
      break
  }

  await config.save()

  clearCache('config')
  log('ADMIN', `[${req.user.username}] Danger action`, action)

  res.redirect('/')
}
