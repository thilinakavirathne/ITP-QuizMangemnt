const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Quiz'
  },
  marks: {
    type: Number,
    required: true,
    min: 0
  }
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
