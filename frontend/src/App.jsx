import { useEffect, useReducer, useState } from "react";
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
import { useSelector } from "react-redux";
import clickOutSide from "./helper/clickOutSide";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "POST_SUCCESS":
      console.log("i am")
      return {
        ...state,
        loading: false,
        error: "",
        post: action.payload,
      };
    case "POST_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

function App() {


  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [{ loading, error, post }, dispatch] = useReducer(reducer, {
    loading: false,
    post: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const  {data}  = await axios.get(
        `${import.meta.env.VITE_API_BACKEND_URL}/getallpost`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error,
      });
    }
  };
  return (
    <div>
      {visible && <CreatePostPopup setVisible={setVisible} user={user} />}
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={<Home post={post} setVisible={setVisible} />}
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
