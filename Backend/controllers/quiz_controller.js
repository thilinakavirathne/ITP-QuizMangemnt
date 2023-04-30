const express = require('express');
const Quiz = require('../models/quiz');

const quizController = express.Router();

quizController.post('/', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

quizController.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.send(quizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});

quizController.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
});

quizController.patch('/:id', async (req, res) => {
  const allowedUpdates = ['module_code', 'student_grade', 'teacher_id', 'date_of_quiz', 'start_time_of_quiz', 'end_time_of_quiz', 'number_of_mcqs'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

quizController.delete('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = quizController;
