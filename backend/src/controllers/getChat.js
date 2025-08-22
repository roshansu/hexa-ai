import User from "../models/user.js"
import History from "../models/history.js"
import { GoogleGenAI } from "@google/genai";



const getChat = async (req, res) => {

    try{
        const {command, deepseek, gemini, openai, chatId, userId} = req.body
        let chatData = {
            openAI:[
                {
                    role: 'user',
                    text:command
                }
            ],
             deepSeek:[
                {
                    role: 'user',
                    text:command
                }
            ],
            gemini:[
                {
                    role: 'user',
                    text:command
                }
            ]
                
        }

        const ai = new GoogleGenAI({apiKey:process.env.GEMINI_KEY});
          let chat;
        let chatHistory = {
            gemini:[],
            openAi:[],
            deepSeek:[]
        };
        const userRole = {
            role:'user',
            text:command
        }

        if(chatId != ''){
            chat = await History.findOne({_id:chatId})
        }else{
             chat={
            gemini:[],
            openAi:[],
            deepSeek:[]
          };
        }
        let selectedModel = [];

        if(!gemini){
            selectedModel.push(Gemini)
            if(chatId != ''){
                chatHistory.gemini.push(chat.gemini)
            }
            // else{
                 chat.gemini.push(userRole)
            // }
        } 
        if(!deepseek){
            selectedModel.push(deepSeek)
            if(chatId != ''){
                chatHistory.deepSeek.push(chat.deepSeek)
            }
            // else{
                 chat.deepSeek.push(userRole)
            // }
        }
        if(!openai){
            selectedModel.push(openAi)
            if(chatId != ''){
                chatHistory.openAi.push(chat.openAi)
            }
            // else{
                 chat.openAi.push(userRole)
            // }
        }
        // console.log(command, model)
        console.log(req.body)
      

        if(chatId!=''){
            
            // chat.openAi.push(userRole)
            console.log(chat)
            await Promise.all(selectedModel.map((fn)=>fn(chat)))
            await chat.save();
            return res.send(chatHistory)
        }
        else{
            console.log("else condition")
           
            console.log(chat)
            await Promise.all(selectedModel.map((fn)=>fn(chat)))
            // text.slice(0, 10);
            console.log(chatHistory)
            const history = await History.create({
            title: command.slice(0, 10),
            gemini: chat.gemini,
            openAi: chat.openAi,
            deepSeek: chat.deepSeek
            });
            const user = await User.findById(userId);
            user.chatHistory.push(history._id);
            await user.save();
            console.log(chatHistory)
            return res.send(chatHistory)

        }
      
        
        async function openAi(history) {
            console.log("Calling openAi")

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: history.openAi,
            config: {
            systemInstruction:"You are a friendly, helpful, safety-conscious assistant. Answer directly first, then give brief supporting bullets. Keep language simple and warm. Use numbered steps for procedures, runnable minimal code for programming, and show step-by-step math. If a request is unsafe or restricted, refuse briefly and offer a safe alternative. Ask one clarifying question only when absolutely necessary. Prefer short answers; expand on request."
            },
        });
            const model ={
                role:'model',
                text:response.text
            }
            // chat.openAi.push(userRole)
            chat.openAi.push(model)
            // console.log(response.text)
            chatHistory.openAi.push(userRole);
            chatHistory.openAi.push(model);
            
        }

         async function deepSeek(history) {
            console.log("Calling deepseek")

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: history.deepSeek,
                config: {
                systemInstruction:`You are DeepSeek AI.  
                    Answer questions briefly and concisely.  
                    Do not generate long explanations, essays, or lengthy outputs.  
                    Focus only on the essential details needed to address the user’s request.  
                    If a question requires multiple steps, summarize each step in short sentences.  
                    `
                },
            });

            const model ={
                role:'model',
                text:response.text
            }
            // chat.deepSeek.push(userRole)
            chat.deepSeek.push(model)
            // console.log(response.text)

            chatHistory.deepSeek.push(userRole);
            chatHistory.deepSeek.push(model);
        }

        async function Gemini(history) {
            console.log("Calling gemini")
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: history.gemini,
                config:{
                    systemInstruction:`You are Gemini AI.  
                        Provide clear, structured, and short answers.  
                        Avoid long paragraphs or excessive details.  
                        Respond with only the necessary information to make the answer useful.  
                        Keep tone professional, simple, and easy to scan.  
                        `
                }
            });

            const model ={
                role:'model',
                text:response.text
            }
            console.log("called")
            // chat.gemini.push(userRole)
            chat.gemini.push(model)
            // console.log(response.text)
            chatHistory.gemini.push(userRole);

            chatHistory.gemini.push(model);
        }
        
        res.send("fcdf")
        // await main();
    }
    catch(err){
        console.log("error; "+err)
    }
}


export const getHistory = async (req, res) => {
    try{
        const {id} = req.params
        const user = await User.findOne({ _id:id })
        .populate("chatHistory");
        console.log(user)
        res.send(user)
    }
    catch(err){
        res.send(err)
    }
}

export const getConversation = async (req, res) => {
    try{
        const {id} = req.params
        const data = await History.findById(id)

        res.send(data)
    }
    catch(err){
        req.send(err)
    }
}

export default getChat