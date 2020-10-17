import * as constants from '../constants'
import { log, hash } from '../utils'
import Question from '../models/question'

export default async (req, res) => {
  if (!req.user || !req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const { level, question, answer } = req.body
  const existingQuestion = await Question.findOne({ level })

  if (existingQuestion) {
    return res.json({
      success: false,
      message: constants.ERR_LEVEL_EXISTS
    })
  }

  const hashedAnswer = hash(answer)
  await Question.create({
    level,
    question,
    answer: hashedAnswer
  })

  log('Admin: question added', `L${level}`)

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
