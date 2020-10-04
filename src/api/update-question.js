import * as constants from '../constants'
import Question from '../models/question'
import AdminLogs from '../models/admin-logs'

const b64 = str => Buffer.from(str).toString('base64')

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
  question.answer = answer
  question.save()

  AdminLogs.create({
    admin: req.user.username,
    action: 'update-question',
    message: `Level ${level}: ${b64(questionText)}:${b64(answer)}`
  })

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
