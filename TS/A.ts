import { OpenAI } from "@langchain/openai";
import { LLMChain } from "@langchain/core";
import { PromptTemplate } from "@langchain/core/prompts";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize OpenAI LLM
const model = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
  temperature: 0.7,
  modelName: "gpt-3.5-turbo",
});

// Define a simple prompt template
const template = new PromptTemplate({
  inputVariables: ["topic"],
  template: "Write me a poem about {topic}.",
});

// Define a chain
const chain = new LLMChain({
  llm: model,
  prompt: template,
});

// Function to call the chain
async function runChain() {
  const response = await chain.call({ topic: "nature" });
  console.log(response);
}

runChain();
