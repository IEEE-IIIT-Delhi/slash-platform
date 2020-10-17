import * as constants from '../constants'
import { clearCache } from '../cache'
import { log, hash } from '../utils'
import Question from '../models/question'

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const { level, question: questionText, answer } = req.body
  const question = await Question.findOne({ level })

  if (!question) {
    return res.json({
      success: false,
      message: constants.ERR_NO_QUESTION
    })
  }

  question.question = questionText
  question.answer = hash(answer)
  await question.save()

  clearCache(`question_${level}`)
  log('ADMIN', `[${req.user.username}] Question updated`, `Level ${level}`)

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
