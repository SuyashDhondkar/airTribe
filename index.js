const express = require('express');
const app = express();
const PORT = 3000; // You can change this to any port number

const quizHelper = require('./helper');

app.use(express.json());


// -------------------------- Test API --------------------------

async function test(req, res) {
  return res.json({ message: 'Hello, this is your API response!' });
}
app.get('/api', (req, res) => {
  return test(req, res);
});


// -------------------------- Test API --------------------------





// -------------------------- Controllers --------------------------

async function generateQuiz(req, res) {
    const { level, topic } = req.body;
    const quiz = await quizHelper.generateQuiz(level, topic);
    return res.json(quiz);
}

async function generateQuizWithContent(req, res) {
    const { level, topic } = req.body;
    const content = await quizHelper.generateQuizWithContent(level, topic);
    return res.json(content);
}

async function submitQuiz(req, res) {
  const { questions } = req.body;
  const response = await quizHelper.updateVectorSpaceWithUserQuizSubmission(questions);
  return res.json(response);
}


// -------------------------- Controllers --------------------------


// -------------------------- Endpoints --------------------------


app.post('/content-with-quiz', (req, res) => {
    return generateQuizWithContent(req, res);
});

app.post('/quiz', (req, res) => {
    return generateQuiz(req, res);
});

app.post('/quiz/submit', (req, res) => {
    return submitQuiz(req, res);
});


// -------------------------- Endpoints --------------------------


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
