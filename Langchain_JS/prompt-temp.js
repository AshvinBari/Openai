import { ChatOpenAI } from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts"
import * as dotenv from "dotenv";
dotenv.config();

// model 
const model = new ChatOpenAI({
    modelName : "gpt-3.5-turbo",
    temperature:0.7,

});

// prompt template
 //const prompt = ChatPromptTemplate.fromTemplate('You are a comedian . Tell a joke based on the following wrod {input}');
// console.log(await prompt.format({input :"chicken"}));



 const prompt = ChatPromptTemplate.fromMessages([
    ["system","Generate a joke"],
    ["human","{input}"],
]);
// create chain 

const chain = prompt.pipe(model)

// call chain 
const response = await chain.invoke({
    input:"dog",
});

console.log(response);
