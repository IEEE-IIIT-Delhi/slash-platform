import * as constants from '../constants'
import Question from '../models/question'

export default async (req, res) => {
  if (!req.user) {
    return res.json({
      success: false,
      message: constants.ERR_NOAUTH
    })
  }

  const { level } = req.user
  const question = await Question
    .findOne({ level })
    .exec()

  return res.json({
    success: false,
    message: constants.GENERIC_SUCC,
    data: { question }
  })
}
