import { OpenAI } from 'openai';
import * as dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Ensure your API key is set in environment variables
});

async function getCompletion() {
  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'how was a day' }],
  });
  console.log(response.choices[0].message?.content);
}

getCompletion();
