const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  module_code: { type: String, required: true },
  student_grade: { type: Number, required: true },
  teacher_id: { type: String, required: true },
  date_of_quiz: { type: Date, required: true },
  start_time_of_quiz: { type: Date, required: true },
  end_time_of_quiz: { type: Date, required: true },
  number_of_mcqs: { type: Number, required: true },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
