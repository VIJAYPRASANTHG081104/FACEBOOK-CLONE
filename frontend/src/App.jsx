import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/login/index'
import Profile from './pages/profile'
import Home from './pages/home'
import './styles/icons/icons.css'
import LoggedInRoutes from './routes/LoggedInRoutes'
import NotLoggedInRoutes from './routes/NotLoggedInRoute'
import Activate from './pages/home/activate'
// import dotenv from 'dotenv'

function App() {
  // dotenv.config();
  console.log(import.meta.env.VITE_API_BACKEND_URL);
  return (
    <div>
      <Routes>
      <Route element={<NotLoggedInRoutes/>}>
        <Route path="/login" element={<Login/>}/>
      </Route>
      <Route element={<LoggedInRoutes/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/activate/:token' element={<Activate/>} exact/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
