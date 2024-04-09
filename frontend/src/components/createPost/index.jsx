import "./style.css";
import LiveVideo from '../../svg/liveVideo'
import Photo from '../../svg/photo'
import Feeling from '../../svg/feeling'
const CreatePost = ({ user }) => {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div className="open_post hover1">
          What is on your mind, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color='#f3425f'/>
          Live Video
        </div>
        <div className="createPost_icon hover1">
          <Photo color='#4bbf67'/>
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color='#f7b928'/>
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
