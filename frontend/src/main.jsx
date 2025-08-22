import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HeroSection from './pages/Hero'
import ChatWindow from './pages/ChatWindow'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HeroSection/>} />
        <Route path='/chat' element={<ChatWindow/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
