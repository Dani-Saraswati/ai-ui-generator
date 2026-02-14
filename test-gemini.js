const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyD3lIZruNd-h7T_kHdg0hCO4rQ3Or3rX4M');

async function test() {
  try {
    console.log('Testing gemini-pro-latest...');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-latest' });
    const result = await model.generateContent('Say hello in one word');
    console.log('✅ Success:', result.response.text());
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();