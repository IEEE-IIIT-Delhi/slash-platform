import * as constants from '../constants'
import express from 'express'
import passport from 'passport'
import fetch from 'node-fetch'
import { body as check, validationResult } from 'express-validator'

import Player from '../models/player'
import RegistrationLogs from '../models/registration-logs'

const router = express.Router()

// User logout at /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// User login at /auth/login
router.post('/login', (req, res) => {
  req.session.error = true

  passport.authenticate('local', (err, player) => {
    if (err) {
      req.session.message = err.message
      return res.redirect('/')
    }

    if (!player) {
      req.session.error = true
      req.session.message = constants.ERR_INVALID_CREDS
      return res.redirect('/')
    }

    req.logIn(player, _err => {
      if (_err) {
        req.session.error = true
        req.session.message = constants.ERR_MISC
        return res.redirect('/')
      }

      req.session.error = false
      req.session.message = undefined
      return res.redirect('/')
    })
  })(req, res)
})

// User register at /auth/register
router.post(
  '/register',
  [
    check('email').isEmail().normalizeEmail(),
    check('username').isAlphanumeric()
  ],
  async (req, res) => {
    req.session.error = true

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      req.session.message = constants.ERR_INVALID_EMAIL_USERNAME
      return res.redirect('/')
    }

    const { username, password, email, name } = req.body

    let existingUser = await Player.findOne({ username })
    if (existingUser) {
      req.session.message = constants.ERR_USERNAME_EXISTS
      return res.redirect('/')
    }

    existingUser = await Player.findOne({ email })
    if (existingUser) {
      req.session.message = constants.ERR_EMAIL_EXISTS
      return res.redirect('/')
    }

    // Collect user location info
    const ip =
      req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress
    const geo = await fetch(`http://ip-api.com/json/${ip}?fields=17`)
      .then(res => res.json())

    const registration = { username, email, name, geo }
    await Player.register(registration, password)
    await RegistrationLogs.create(registration)

    req.session.error = false
    req.session.message = constants.SUCCESSFUL_REGISTRATION
    res.redirect('/')
  }
)

export default router
