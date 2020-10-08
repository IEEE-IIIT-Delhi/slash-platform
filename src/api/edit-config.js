import Config from '../models/config'

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.redirect('/')
  }

  const config = await Config.findOne()
  const { action } = req.body

  if (action === 'begin') {
    config.started = true
  } else if (action === 'end') {
    config.ended = true
  }

  await config.save()
  res.redirect('/')
}
