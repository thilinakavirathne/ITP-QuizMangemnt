const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer_1: { type: String },
  answer_2: { type: String },
  answer_3: { type: String },
  answer_4: { type: String },
  correct_answer: { type: Number, required: true },
  quiz_id : {type:String, required:true}
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
