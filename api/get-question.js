import * as constants from '../src/constants'
import Question from '../models/question'

export default async (req, res) => {
  if (!req.user) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const level = req.user.admin ? req.body.level : req.user.level
  const question = await Question.findOne({ level }).cache({ key: `question_${level}` })

  if (!question && req.user.admin) {
    return res.json({
      success: false,
      message: constants.ERR_NO_QUESTION
    })
  }

  if (!question) {
    return res.json({
      success: true,
      message: constants.GENERIC_SUCC,
      data: { win: true }
    })
  }

  return res.json({
    success: true,
    message: constants.GENERIC_SUCC,
    data: {
      win: false,
      question: req.user.admin ? question : question.question
    }
  })
}
