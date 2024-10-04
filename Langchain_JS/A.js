import OpenAI from "openai";
const openai = new OpenAI();

const image = await openai.images.generate({ prompt: "A cute baby sea otter" });

console.log(image.data[0].url);