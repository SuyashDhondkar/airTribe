const openAI = require('./openAI');
const fs = require('fs');

async function getPromptForGenerateContentWithQuiz(level, topic) {
    const prompt = `explain ${topic} for an ${level} in text only content in not more than 600 words. Generate a 5 question quiz on the topic in objective format with 4 choices, return the entire in json format { "explianation" : "", "question" : [ { "question" : "", "choices" : [""], "indexOfCorrectChoice" }, {}, {}, {}, {} ] }.`;
    return prompt;
}

async function getPromptForGenerateQuiz(level, topic) {
    const previousQuizContextBuffer = fs.readFileSync('previousQuiz.json');
    const previousQuizContext = JSON.parse(previousQuizContextBuffer);
    const previousQuizContextStringified = JSON.stringify(previousQuizContext);
    const prompt = `generate a 5 question quiz on ${topic} for an ${level} in objective format based on the user's previous quiz (in objective format with 4 choices) context, return the entire in json format { "question" : [ { "question" : "", "choices" : [""], "indexOfCorrectChoice" }, {}, {}, {}, {} ] }`;
    return { previousQuizContext: previousQuizContextStringified, prompt };
}

async function generateQuizWithContent(level, topic) {
    const prompt = await getPromptForGenerateContentWithQuiz(level, topic); 
    const contentInJson = await openAI.pingPongWithoutContext(prompt);
    const data = JSON.parse(contentInJson);
    return data;
}

async function generateQuiz(level, topic) {
    const { prompt, previousQuizContext } = await getPromptForGenerateQuiz(level, topic);
    const quiz = await openAI.pingPongWithContext(prompt, previousQuizContext);
    const data = JSON.parse(quiz);
    return data;
}

async function updateVectorSpaceWithUserQuizSubmission(questions) {
    fs.writeFileSync('previousQuiz.json', JSON.stringify(questions));
    return { status: 'success' };
}

module.exports = {
    generateQuizWithContent,
    generateQuiz,
    updateVectorSpaceWithUserQuizSubmission
};