const openAI = require('openai');

const openai = new openAI({
    apiKey: 'testKey'
  });

async function pingPongWithContext(question, context) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: `You're a mentor. You've to teach and test him/her based on this context\n ${context}` },
            { role: 'user', content: question },
        ],
        model: 'gpt-3.5-turbo',
    });
    const [response] = chatCompletion.choices;
    return response.message.content;
}

async function pingPongWithoutContext(question) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: `You're a mentor. You've to teach and test him/her` },
            { role: 'user', content: question },
        ],
        model: 'gpt-3.5-turbo',
    });
    const [response] = chatCompletion.choices;
    return response.message.content;
}

module.exports = {
    pingPongWithoutContext,
    pingPongWithContext,
};
