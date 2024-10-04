import "cheerio"
//import {CheerioWebBaseLoader} from "@langchain/community/dist/document_loaders/web/cheerio"

import { ChatOpenAI } from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts"
import { Document} from "@langchain/core/documents"
//import {createStuffDocumentsChain} from "@langchain/core/combine_documents"
import{CheeriowebBaseLoader} from 'langchain/document_loaders/web/cheerio';

import * as dotenv from "dotenv";
dotenv.config();

const model = new ChatOpenAI(
    {
        modelName : "gpt-3.5-turbo",
        temperature:0.7,
    }
);
const prompt = ChatPromptTemplate.fromTemplate(
    "Answer the user's question . Context : {context} Question:{input}"
);
//const chain = prompt.pipe(model); 
const chain = createStuffDocumentaChain({
    llm:model,
    prompt,
})
// Doc
// const documentA = new Document({
//     pageContent:"Use your own data with large language models (LLMs, OpenAI ChatGPT and others) in JS runtime environments with TypeScript support."
// })

const loader=new CheeriowebBaseLoader("https://js.langchain.com/docs/how_to/#langchain-expression-language-lcel");
const docs = await loader.load();
console.log(docs);
const response = await chain.invoke({
   // input: "What is the capital of France?",
    input:"where is mumbai ",
    context : [],
})
console.log(response);