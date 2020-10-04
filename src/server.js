import { config as envConfig } from 'dotenv'
import * as sapper from '@sapper/server'
import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'

import Player from './models/player'
import api from './routers/api'
import auth from './routers/auth'

envConfig()

// get those vars
const {
  PORT,
  SESSION_SECRET,
  MONGODB_CONNECTION_URI
} = process.env

// instantiate express app
const app = express()

// Mongoose connection
mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const MongoStore = connectMongo(session)

// use express-session to store sessions
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(Player.createStrategy())
passport.serializeUser(Player.serializeUser())
passport.deserializeUser(Player.deserializeUser())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.set('trust proxy', true)

// Setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// the static content from /static
app.use(express.static('static'))

// Routes
app.use('/auth', auth)
app.use('/api', api)

// the sapper stuff
app.use(sapper.middleware({
  session: (req, res) => {
    res.setHeader('cache-control', 'no-cache, no-store')
    let user
    if (req.user) {
      const { username, admin, level } = req.user
      user = { username, admin, level }
    }
    const { error, message } = req.session

    req.session.error = false
    req.session.message = undefined

    return { error, message, user }
  }
}))

// finally listen
app.listen(
  { port: PORT },
  () => console.log(`Server ready at http://localhost:${PORT}`)
)
