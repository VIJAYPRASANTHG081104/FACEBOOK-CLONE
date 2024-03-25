import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/login/index'
import Profile from './pages/profile'
import Home from './pages/home'
import './styles/icons/icons.css'
// import dotenv from 'dotenv'

function App() {
  // dotenv.config();
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
