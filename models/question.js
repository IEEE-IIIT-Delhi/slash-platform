import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  level: {
    type: Number,
    unique: true,
  },
  question: String,
  img: String,
  answer: String,
});

export default mongoose.model("Question", QuestionSchema);
