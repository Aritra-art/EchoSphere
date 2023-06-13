import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUserService } from "../services/getSingleUserService";
import "./SingleProfile.css";
import { getUser } from "../backend/utils/getUser";
import { DataContext } from "../context/DataContext";

export const SingleProfile = () => {
  const { username } = useParams();

  const user = getUser();
  const [singleUser, setSingleUser] = useState({});
  const { postState } = useContext(DataContext);
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
  }, [username, postState?.users]);
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
        </div>
      )}
    </>
  );
};
