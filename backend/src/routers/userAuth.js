import express from 'express'
import { register, login, logout } from '../controllers/userAuthentication.js';
const userAuthRouter = express.Router();

userAuthRouter.post('/register', register)
userAuthRouter.post('/login', login)
userAuthRouter.get('/logout', logout)

export default userAuthRouter