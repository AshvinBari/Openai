// Import required packages and types
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize the ChatOpenAI model with type annotations
const model: ChatOpenAI = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
});

// Define the prompt template using ChatPromptTemplate
const prompt: ChatPromptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "Generate a joke"],
    ["human", "{input}"],
]);

// Create a chain by piping the prompt to the model
const chain = prompt.pipe(model);

// Define an async function to call the chain
async function callChain() {
    try {
        // Call the chain with the input value
        const response = await chain.invoke({
            input: "human",
        });

        // Log the response
        console.log(response);
    } catch (error) {
        console.error("Error invoking chain:", error);
    }
}

// Call the function to execute the chain
callChain();
