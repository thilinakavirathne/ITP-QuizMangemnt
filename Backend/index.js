const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const quizController = require('./controllers/quiz_controller');
const questionController = require('./controllers/question_controller');
const markController = require('./controllers/mark_controller');

// Set up express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Set up API routes
app.use('/api/quizzes', quizController);
app.use('/api/questions', questionController);
app.use('/api/marks', markController);

// Connect to MongoDB database
mongoose.connect('mongodb+srv://thilinaQ:1234@cluster0.ze2qykr.mongodb.net/test')  //my new db
//mongodb+srv://root:071656Ad@cluster0.zekgg7g.mongodb.net/test

  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

// Start server
const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
