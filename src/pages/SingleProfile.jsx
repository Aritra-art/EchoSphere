import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUserService } from "../services/getSingleUserService";
import "./SingleProfile.css";
import { getUser } from "../backend/utils/getUser";
import { DataContext } from "../context/DataContext";
import { getAllPostsByUsernameService } from "../services/getAllPostsByUsernameService";
import { Postcard } from "../components/PostCard";

export const SingleProfile = () => {
  const { username } = useParams();

  const user = getUser();
  const [singleUser, setSingleUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { postState } = useContext(DataContext);
  const getPostsByUsername = async () => {
    try {
      const response = await getAllPostsByUsernameService(username);
      if (response?.status === 200) {
        setUserPosts(response?.data?.posts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getSingleUser = async () => {
    try {
      const response = await getSingleUserService(username);
      if (response?.status === 200) {
        setSingleUser(response?.data?.user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSingleUser();
    getPostsByUsername();
  }, [username, postState?.users, postState?.posts]);
  return (
    <>
      {Object.keys(singleUser)?.length > 0 && (
        <div className="single-user-container-layout">
          <img
            alt="user-avatar"
            src={singleUser?.profileAvatar}
            className="single-user-avatar"
          />
          <h2 className="center-text bold">
            {singleUser?.firstName} {singleUser?.lastName}
          </h2>
          <h3 className="center-text gray-color">@{singleUser?.username}</h3>
          {user && user.username === singleUser?.username ? (
            <div className="single-user-edit-button">Edit Profile</div>
          ) : (
            <div className="single-user-edit-button">Follow</div>
          )}
          <p className="center-text single-user-profile-bio">
            {singleUser?.bio}
          </p>
          <p className="center-text ">
            <a
              target="_blank"
              href={singleUser?.website}
              style={{
                textDecoration: "none",
                color: "#ff3b30",
                fontWeight: "bold",
              }}
            >
              {singleUser?.website}
            </a>
          </p>
          {userPosts.length > 0 && <Postcard data={userPosts} />}
        </div>
      )}
    </>
  );
};
