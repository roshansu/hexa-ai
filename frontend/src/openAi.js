import { OpenAI } from "openai";
import dotenv from 'dotenv'
dotenv.config()

const client = new OpenAI({apiKey: process.env.OPENAI_KEY});

const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    input: [
        {
            role: "developer",
            content: "Talk like a pirate."
        },
        {
            role: "user",
            content: "Are semicolons optional in JavaScript?",
        },
    ],
});
console.log(response.output_text);