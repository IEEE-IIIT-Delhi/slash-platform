import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  level: {
    type: Number,
    unique: true
  },
  question: String,
  answer: String
})

QuestionSchema.statics.addQuestion = (level, question, answer, callback) => {
  const qs = new Question({
    level: level,
    question: question,
    answer: answer
  })
  qs.save(err => {
    if (err) {
      return callback(err)
    } else {
      return callback(null, qs)
    }
  })
}

QuestionSchema.statics.checkAnswer = (level, answer, callback) => {
  Question.findOne({ level: level }).exec((err, question) => {
    if (question.answer === answer) {
      return callback(false)
    } else {
      return callback(true)
    }
  })
}

QuestionSchema.statics.getQuestion = (level, callback) => {
  Question.findOne({ level: level }).exec((err, level) => {
    if (!level) {
      const isOver = true
      return callback('', isOver)
    }
    const isOver = false
    return callback(level.question, isOver)
  })
}

module.exports = mongoose.model('Question', QuestionSchema)
