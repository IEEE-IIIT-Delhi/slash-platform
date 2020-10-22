import express from 'express'

const router = express.Router()

router.get('/', async (req, res, next) => {
  if (
    req.user &&
    req.user.level === -1 &&
    req.user.username === req.get('User-Agent')
  ) {
    return res.end('salmankhan')
  }
  return next()
})

export default router
