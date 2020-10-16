import * as constants from '../constants'
import express from 'express'
import passport from 'passport'
import fetch from 'node-fetch'
import { validate } from 'email-validator'

import { clearKey } from '../cache'
import Player from '../models/player'
import RegistrationLogs from '../models/registration-logs'
import { log } from '../utils'

const router = express.Router()

function login (player, req) {
  const response = {}

  req.logIn(player, err => {
    if (err) {
      response.success = false
      response.message = constants.ERR_MISC
      return
    }

    log('Logged in', player.username)

    response.success = true
    response.message = constants.LOGIN_SUCCESS
  })

  return response
}

// User logout at /auth/logout
router.get('/logout', (req, res) => {
  log('Logged out', req.user.username)

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

  const { username, password, email, name } = req.body

  if (
    !validate(email) ||
    !constants.ANSWER_REGEX.test(username) ||
    !constants.USERNAME_LENGTH_REGEX.test(username)
  ) {
    response.message = constants.ERR_INVALID_EMAIL_USERNAME
    return res.json(response)
  }

  let existingUser = await Player.findOne({ username })
  if (existingUser) {
    response.message = constants.ERR_USERNAME_EXISTS
    return res.json(response)
  }

  existingUser = await Player.findOne({ email })
  if (existingUser) {
    response.message = constants.ERR_EMAIL_EXISTS
    return res.json(response)
  }

  // Collect user location info
  const ip = req.headers['x-real-ip']
  const geo = await fetch(`http://ip-api.com/json/${ip}?fields=17`)
    .then(_res => _res.json())

  const player = await Player.register({ username, email, name, geo }, password)
  await RegistrationLogs.create({ username })

  log('Registered', username)

  clearKey('leaderboard')

  response = login(player, req)
  return res.json(response)
})

export default router
