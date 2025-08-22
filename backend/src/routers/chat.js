import express from 'express'
import getChat from '../controllers/getChat.js'
import { getHistory, getConversation } from '../controllers/getChat.js'

const chatRouter = express.Router()

console.log("chat")
chatRouter.post('/get',  getChat)
chatRouter.get('/history/:id', getHistory)
chatRouter.get('/conversation/:id', getConversation)

export default chatRouter