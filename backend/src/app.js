import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import DbConnect from './config/connectDB.js';
import chatRouter from './routers/chat.js';
import userAuthRouter from './routers/userAuth.js';

const app =  express();

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "https://hexaai-wheat.vercel.app"],
    credentials: true
}))

app.use('/chat', chatRouter)
app.use('/user', userAuthRouter)

const PORT = process.env.PORT || 5000;

DbConnect()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("App is listening on ", PORT)
    })
})
.catch((err)=>{
    console.log(err)
})
