const express = require('express');
const Question = require('../models/question');

const questionController = express.Router();

questionController.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
});

questionController.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.send(questions);
  } catch (error) {
    res.status(500).send(error);
  }
});

questionController.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).send();
    }
    res.send(question);
  } catch (error) {
    res.status(500).send(error);
  }
});

questionController.patch('/:id', async (req, res) => {
  const allowedUpdates = ['question', 'answer_1', 'answer_2', 'answer_3', 'answer_4', 'correct_answer',"quiz_id"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!question) {
      return res.status(404).send();
    }
    res.send(question);
  } catch (error) {
    res.status(400).send(error);
  }
});

questionController.delete('/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).send();
    }
    res.send(question);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = questionController;
