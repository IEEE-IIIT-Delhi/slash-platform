import * as constants from '../constants'
import express from 'express'
import passport from 'passport'
import fetch from 'node-fetch'
import { validate } from 'email-validator'

import { clearKey } from '../cache'
import Player from '../models/player'
import RegistrationLogs from '../models/registration-logs'

const router = express.Router()

// User logout at /auth/logout
router.get('/logout', (req, res) => {
  console.log(`${Date.now()}: Logged out: ${req.user.username}`)

  req.logout()
  res.redirect('/')
})

// User login at /auth/login
router.post('/login', (req, res) => {
  req.session.error = true

  passport.authenticate('local', (err, player) => {
    if (err) {
      req.session.message = err.message
      return res.redirect('/login')
    }

    if (!player) {
      req.session.message = constants.ERR_INVALID_CREDS
      return res.redirect('/login')
    }

    if (player.disqualified) {
      req.session.message = constants.ERR_PLAYER_DQ
      return res.redirect('/login')
    }

    req.logIn(player, _err => {
      if (_err) {
        req.session.message = constants.ERR_MISC
        return res.redirect('/login')
      }

      console.log(`${Date.now()}: Logged in: ${player.username}`)

      req.session.error = false
      req.session.message = undefined
      return res.redirect('/')
    })
  })(req, res)
})

// User register at /auth/register
router.post('/register', async (req, res) => {
  req.session.error = true
  const { username, password, email, name } = req.body

  if (
    !validate(email) ||
    !constants.ANSWER_REGEX.test(username) ||
    !constants.USERNAME_LENGTH_REGEX.test(username)
  ) {
    req.session.message = constants.ERR_INVALID_EMAIL_USERNAME
    return res.redirect('/register')
  }

  let existingUser = await Player.findOne({ username })
  if (existingUser) {
    req.session.message = constants.ERR_USERNAME_EXISTS
    return res.redirect('/register')
  }

  existingUser = await Player.findOne({ email })
  if (existingUser) {
    req.session.message = constants.ERR_EMAIL_EXISTS
    return res.redirect('/register')
  }

  // Collect user location info
  const ip = req.headers['x-real-ip']
  const geo = await fetch(`http://ip-api.com/json/${ip}?fields=17`)
    .then(res => res.json())

  const player = await Player.register({ username, email, name, geo }, password)
  await RegistrationLogs.create({ username })

  console.log(`${Date.now()}: Registered: ${username}`)

  clearKey('leaderboard_main')
  clearKey('leaderboard_rank')

  // log the player in
  req.logIn(player, err => {
    if (err) {
      req.session.message = constants.ERR_MISC
      return res.redirect('/login')
    }

    console.log(`${Date.now()}: Logged in: ${player.username}`)

    req.session.error = false
    req.session.message = undefined
    return res.redirect('/')
  })
})

export default router
