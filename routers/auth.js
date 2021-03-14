import express from 'express'
import passport from 'passport'

import Player from '../models/player'
import * as constants from '../src/constants'
import { clearCache } from '../src/cache'
import { log, getGeoInfo } from '../src/utils'

function login (player, req) {
  const response = {}

  req.logIn(player, err => {
    if (err) {
      response.success = false
      response.message = constants.ERR_MISC
      return
    }

    log('AUTH', 'Logged in', player.username)

    response.success = true
    response.message = constants.LOGIN_SUCCESS
  })

  return response
}

const router = express.Router()

// User logout at /auth/logout
router.get('/logout', (req, res) => {
  log('AUTH', 'Logged out', req.user.username)

  req.logout()
  res.redirect('/')
})

// User login at /auth/login
router.post('/login', (req, res) => {
  let response = {
    success: false,
    message: undefined
  }

  passport.authenticate('local', (err, player) => {
    if (err) {
      response.message = err.message
      return res.json(response)
    }

    if (!player) {
      response.message = constants.ERR_INVALID_CREDS
      return res.json(response)
    }

    if (player.disqualified) {
      response.message = constants.ERR_PLAYER_DQ
      return res.json(response)
    }

    response = login(player, req)
    return res.json(response)
  })(req, res)
})

// User register at /auth/register
router.post('/register', async (req, res) => {
  let response = {
    success: false,
    message: undefined
  }

  const { username, password, house } = req.body

  if (
    !constants.ANSWER_REGEX.test(username) ||
    !constants.USERNAME_LENGTH_REGEX.test(username)
  ) {
    response.message = constants.ERR_INVALID_EMAIL_USERNAME
    return res.json(response)
  }

  const existingUser = await Player.findOne({ username })
  if (existingUser) {
    response.message = constants.ERR_USERNAME_EXISTS
    return res.json(response)
  }

  const geo = await getGeoInfo(req)
  const player = await Player.register({ username, geo, house }, password)

  log('AUTH', 'Registered', username)
  clearCache('leaderboard')

  response = login(player, req)
  return res.json(response)
})

export default router
