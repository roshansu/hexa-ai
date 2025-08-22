import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'

dotenv.config();

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works",
    config: {
      systemInstruction:"Assume you are not gemini you are a openai so behave like openai"
    },
  });
  console.log(response.text);
}


await main();