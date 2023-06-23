import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUserService } from "../services/getSingleUserService";
import "./SingleProfile.css";
import { getUser } from "../backend/utils/getUser";
import { DataContext } from "../context/DataContext";
import { getAllPostsByUsernameService } from "../services/getAllPostsByUsernameService";
import { Postcard } from "../components/PostCard";
import { Navbar } from "../components/Navbar";
import { isUserFollowed } from "../backend/utils/isUserFollowed";
import { unFollowUser } from "../backend/utils/unFollowUser";
import { followUser } from "../backend/utils/followUser";
import { getToken } from "../backend/utils/getToken";
import { ShowFollowing } from "../components/ShowFollowing";
import { ShowEdit } from "../components/ShowEdit";

export const SingleProfile = () => {
  const { username } = useParams();

  const user = getUser();
  const token = getToken();
  const [singleUser, setSingleUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState({
    show: false,
    type: "",
  });
  const [editProfile, setEditProfile] = useState({ show: false, type: "" });
  const { postState, dispatchPost } = useContext(DataContext);
  const navigate = useNavigate();
  const getPostsByUsername = async () => {
    try {
      const response = await getAllPostsByUsernameService(username);
      if (response?.status === 200) {
        // console.log(response?.data?.posts);
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
      {showModal.show && (
        <ShowFollowing
          arr={
            showModal?.type === "FOLLOWING"
              ? singleUser?.following
              : singleUser?.followers
          }
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
      {editProfile.show && (
        <ShowEdit
          obj={singleUser}
          type={editProfile?.type}
          setEditProfile={setEditProfile}
        />
      )}
      <div style={{ marginBottom: "4rem" }}>
        <Navbar
          from={`${singleUser?.firstName ?? ""} ${singleUser?.lastName ?? ""}`}
        />
      </div>

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
            <div
              className="single-user-edit-button"
              onClick={() => {
                setEditProfile((editProfile) => ({
                  ...editProfile,
                  show: true,
                  type: "EDIT PROFILE",
                }));
              }}
            >
              Edit Profile
            </div>
          ) : (
            <div
              className="single-user-edit-button"
              onClick={() => {
                if (user) {
                  if (isUserFollowed(postState?.users, singleUser?._id)) {
                    unFollowUser(token, singleUser?._id, dispatchPost);
                  } else {
                    followUser(singleUser?._id, token, dispatchPost);
                  }
                } else {
                  alert("please login to follow");
                  navigate("/login");
                }
              }}
            >
              {isUserFollowed(postState?.users, singleUser?._id)
                ? "Unfollow"
                : "Follow"}
            </div>
          )}
          <p className="center-text single-user-profile-bio">
            {singleUser?.bio}
          </p>
          <p className="center-text ">
            <a
              target="_blank"
              href={singleUser?.website}
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "#ff3b30",
                fontWeight: "bold",
              }}
            >
              {singleUser?.website}
            </a>
          </p>

          <div className="single-user-follow-layout">
            <p
              className="flex-col "
              onClick={() => {
                setShowModal((showModal) => ({
                  ...showModal,
                  show: true,
                  type: "FOLLOWING",
                }));
              }}
            >
              <span className="single-user-follow-layout-pill">
                {singleUser?.following?.length}
              </span>
              <span className="single-user-follow-layout-pill-name">
                Following
              </span>
            </p>
            <p className="flex-col">
              <span className="single-user-follow-layout-pill">
                {userPosts?.length}
              </span>
              <span>Posts</span>
            </p>
            <p
              className="flex-col"
              onClick={() => {
                setShowModal((showModal) => ({
                  ...showModal,
                  show: true,
                  type: "FOLLOWERS",
                }));
              }}
            >
              <span className="single-user-follow-layout-pill">
                {singleUser?.followers?.length}
              </span>
              <span className="single-user-follow-layout-pill-name">
                Followers
              </span>
            </p>
          </div>
          {userPosts.length > 0 && <Postcard data={userPosts} />}
        </div>
      )}
    </>
  );
};
