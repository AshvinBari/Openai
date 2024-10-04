import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
dotenv.config();
const model = new ChatOpenAI({
    modelName:"gpt-3.5-turbo",
    temperature :0.7,
    maxTokens: 1000,
    verbose : true,
   
});
 //invoke is a single in put and single output 
 // batch is multiple input in .batch(["hello","how are you "]) only 
//const response = await model.invoke("how are you ");
const response = await model.batch(["how to make maggi ", "in 2 min "])
console.log(response);
