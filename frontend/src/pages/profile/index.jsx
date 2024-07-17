import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducer";
import axios from "axios";
import Header from "../../components/header";
import Cover from "./Cover";
import './style.css'
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { username } = useParams();
  var userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName]);

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok == false) {
        console.log("hile");
        navigate("/profile");
      } else {
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  console.log(profile);

  return (
    <div className="profile">
      <Header page={"profile"} />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover}/>
          <ProfilePictureInfos profile={profile}/>
          <ProfileMenu/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
