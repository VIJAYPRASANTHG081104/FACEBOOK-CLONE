import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducer";
import axios from "axios";
import Header from "../../components/header";
import Cover from "./Cover";
import "./style.css";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../../components/createPost/index";
import GridPosts from "./GridPosts";
import Post from "../../components/post/index";
import Photos from "./Photos";
import Friends from "./Friends";
import { Link } from "react-router-dom";

const Profile = ({ setVisible }) => {
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

  var vistor = userName == user.username ? false : true;

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


  return (
    <div className="profile">
      <Header page={"profile"} />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} vistor={vistor} />
          <ProfilePictureInfos profile={profile} vistor={vistor} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                <Photos userName={userName} token={user.token} />
                <Friends friends={profile.friends} />
                <div
                  className={"relative_fb_copyright"}
                >
                  <Link to={"/"}>Privacy </Link>
                  <span>.</span>
                  <Link to={"/"}>Terms </Link>
                  <span>.</span>
                  <Link to={"/"}>Advertising </Link>
                  <span>.</span>
                  <Link to={"/"}>
                    Ad Choices <i className="ad_choices_icon"></i>
                  </Link>
                  <span>.</span>
                  <Link to={"/"}>Cookies </Link>
                  <span>.</span>
                  <Link to={"/"}>More </Link>
                  <span>.</span>
                  <br />
                  Andio@2024
                </div>
              </div>
              <div className="profile_right">
                {!vistor && (
                  <CreatePost
                    user={user}
                    profile={true}
                    setVisible={setVisible}
                  />
                )}
                <GridPosts />
                <div className="post">
                  {profile.post && profile.post.length ? (
                    profile.post.map((post, index) => {
                      return (
                        <Post
                          user={user}
                          key={post._id}
                          post={post}
                          profile={profile}
                        />
                      );
                    })
                  ) : (
                    <div className="no_post">No post available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
