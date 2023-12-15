import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
  questionTitle: { type: String, required: "Question must have a title"},
  questionBody: { type: String, required: "Question must have a body"},
  questionTags: { type: [String], required: "Question must have Tag(s)"},
  noOfAnswers: { type: Number, defaultL: 0},
  upVote: { type: [String], default: []},
  downVote: { type: [String], default: []},
  userPosted: { type: String, require:"Question must have an Auther"},
  userId: { type: String },
  askedOn: { type: Date, default: Date.now},
  answer: [{
    answerBody: String,
    userAnswered: String,
    answeredOn: { type: Date, default: Date.now},
    userId: String,
  }]
})

export default mongoose.model("Question", QuestionSchema)