const express = require('express');
const Mark = require('../models/mark');

const markController = express.Router();

markController.post('/', async (req, res) => {
  try {
    const mark = new Mark(req.body);
    await mark.save();
    res.status(201).send(mark);
  } catch (error) {
    res.status(400).send(error);
  }
});

markController.get('/', async (req, res) => {
  try {
    const marks = await Mark.find();
    res.send(marks);
  } catch (error) {
    res.status(500).send(error);
  }
});

markController.get('/:id', async (req, res) => {
  try {
    const mark = await Mark.findById(req.params.id);
    if (!mark) {
      return res.status(404).send();
    }
    res.send(mark);
  } catch (error) {
    res.status(500).send(error);
  }
});

markController.patch('/:id', async (req, res) => {
  const allowedUpdates = ['student_id', 'quiz_id', 'marks'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const mark = await Mark.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!mark) {
      return res.status(404).send();
    }
    res.send(mark);
  } catch (error) {
    res.status(400).send(error);
  }
});

markController.delete('/:id', async (req, res) => {
  try {
    const mark = await Mark.findByIdAndDelete(req.params.id);
    if (!mark) {
      return res.status(404).send();
    }
    res.send(mark);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = markController;
