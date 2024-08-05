import axios from "axios";
import { useEffect, useReducer } from "react";
import { photosReducer } from "../../functions/reducer.js";

export default function Photos({ userName, token }) {
  const [{ loading, error, photos }, dispatch] = useReducer(photosReducer, {
    loading: false,
    photos: {},
    error: "",
  });
  useEffect(() => {
    getPhotos();
  }, [userName]);
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  const getPhotos = async () => {
    try {
      dispatch({
        type: "PHOTO_REQUEST",
      });
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}/listImages`,
        { path, sort, max },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "PHOTO_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PHOTO_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}
