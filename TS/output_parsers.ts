// Import required libraries and types
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser, CommaSeparatedListOutputParser, StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize model with OpenAI
const model: ChatOpenAI = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
});

// Function to parse string output
async function callStringOutputParser(): Promise<string | undefined> {
    const prompt = ChatPromptTemplate.fromMessages([
        { role: "system", content: "Generate a joke based on a word provided by the user." },
        { role: "user", content: "{input}" },
    ]);

    const parser = new StringOutputParser();

    // Create chain and call it
    const response = await prompt.pipe(model).pipe(parser).invoke({
        input: "baby",
    });

    return response;
}

// Function to parse list output
async function callListOutputParser(): Promise<string[] | undefined> {
    const prompt = ChatPromptTemplate.fromTemplate('Provide 5 Indian pet names for the word: {word}');

    // Output parser for comma-separated lists
    const outputParser = new CommaSeparatedListOutputParser();

    // Create chain and call it
    const response = await prompt.pipe(model).pipe(outputParser).invoke({
        word: "dog",
    });

    return response;
}

// Function to parse structured output
async function callStructuredOutputParser(): Promise<any> {
    const prompt = ChatPromptTemplate.fromTemplate(
        'Extract information from the following phrase: {phrase}\nFormatting Instructions: {format_instructions}'
    );

    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
        name: "the name of the person",
        age: "the age of the person",
    });

    const formatInstructions = outputParser.getFormatInstructions();

    const chain = prompt.pipe(model).pipe(outputParser);

    // Invoke the chain with the input phrase
    return await chain.invoke({
        phrase: "Max is 30 years old.",
        format_instructions: formatInstructions,
    });
}

// Function to parse Zod schema-based output
async function callZodOutputParser(): Promise<any> {
    const prompt = ChatPromptTemplate.fromTemplate(
        'Extract information from the following phrase: {phrase}\nFormatting Instructions: {format_instructions}'
    );

    const outputParser = StructuredOutputParser.fromZodSchema(
        z.object({
            recipe: z.string().describe("name of recipe"),
            ingredients: z.array(z.string()).describe("list of ingredients"),
        })
    );

    const chain = prompt.pipe(model).pipe(outputParser);

    return await chain.invoke({
        phrase: "Are you tired of the same old bland dinners? Give this chicken tikka masala a try. Originating from the Indian subcontinent, this dish is known for its rich flavor and comforting appeal. Bite-sized chicken pieces are marinated in a mixture of yogurt, cumin, paprika, and garam masala to tenderize and flavor the meat. Once marinated, the chicken is baked in the oven, then simmered in a rich, creamy tomato-based sauce infused with aromatic spices. The tanginess of the tomatoes balances the richness of the cream and the boldness of the spices, infusing every mouthful with depth. Pair with fluffy steamed rice or buttery garlic naan for the most flavorful dinner ever!",
        format_instructions: outputParser.getFormatInstructions(),
    });
}

// Main function to call the appropriate parser
(async () => {
    // Uncomment the respective function to test different parsers

    const response = await callStringOutputParser();
     //const response = await callListOutputParser();
    // const response = await callStructuredOutputParser();
    //const response = await callZodOutputParser();
    
    console.log(response);
})();
