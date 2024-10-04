// Import required modules and types
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize the OpenAI model with type annotations
const model: ChatOpenAI = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
});

// Define the prompt template
const prompt: ChatPromptTemplate = ChatPromptTemplate.fromTemplate(
    "Answer the user's question.{input}"
);

// Create a chain by piping the prompt into the model
const chain = prompt.pipe(model);

// Async function to call the chain and get the response
async function getResponse() {
    try {
        const response = await chain.invoke({
            input: "Where is Mumbai?",
        });
        console.log(response);
    } catch (error) {
        console.error("Error invoking the chain:", error);
    }
}

// Call the function to get the response
getResponse();
