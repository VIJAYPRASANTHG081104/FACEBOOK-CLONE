import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/index";
import Profile from "./pages/profile";
import Home from "./pages/home";
import "./styles/icons/icons.css";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoute";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import {useSelector} from 'react-redux'

function App() {
  const user  = useSelector((state)=>state.user);
  return (
    <div>
    {/* <CreatePostPopup user={user} /> */}
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route path="/reset" element={<Reset/>}/>
      </Routes>
    </div>
  );
}

export default App;
