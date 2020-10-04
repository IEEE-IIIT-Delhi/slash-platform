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

  const { level, question, answer } = req.body
  const existingQuestion = await Question.findOne({ level })

  if (existingQuestion) {
    return res.json({
      success: false,
      message: constants.ERR_LEVEL_EXISTS
    })
  }

  await Question.create({ level, question, answer })

  await AdminLogs.create({
    admin: req.user.username,
    action: 'add-question',
    message: `Level ${level}: ${b64(question)}:${b64(answer)}`
  })

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC
  })
}
