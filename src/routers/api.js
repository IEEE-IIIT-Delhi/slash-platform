import express from 'express'

import addAdmin from '../api/add-admin'
import addQuestion from '../api/add-question'
import checkAnswer from '../api/check-answer'
import disqualifyPlayer from '../api/disqualify-player'
import getConfig from '../api/get-config'
import getLeaderboard from '../api/get-leaderboard'
import getPlayerRank from '../api/get-player-rank'
import getQuestion from '../api/get-question'
import updatePlayerLevel from '../api/update-player-level'
import updateQuestion from '../api/update-question'

const router = express.Router()

router.get('/get-config', getConfig)
router.get('/get-leaderboard', getLeaderboard)
router.get('/get-player-rank', getPlayerRank)
router.get('/get-question', getQuestion)
router.post('/add-admin', addAdmin)
router.post('/add-question', addQuestion)
router.post('/check-answer', checkAnswer)
router.post('/disqualify-player', disqualifyPlayer)
router.post('/update-player-level', updatePlayerLevel)
router.post('/update-question', updateQuestion)

export default router
