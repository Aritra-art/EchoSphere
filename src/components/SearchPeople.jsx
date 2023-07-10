import { useContext, useState } from "react";
import "./SearchPeople.css";
import { DataContext } from "../context/DataContext";
import { Link, useNavigate } from "react-router-dom";
import { isUserFollowed } from "../backend/utils/isUserFollowed";
import { getUser } from "../backend/utils/getUser";
import { unFollowUser } from "../backend/utils/unFollowUser";
import { followUser } from "../backend/utils/followUser";
import { getToken } from "../backend/utils/getToken";
import { toast } from "react-hot-toast";

export const SearchPeople = () => {
  const [userInput, setUserInput] = useState("");
  const { postState, dispatchPost } = useContext(DataContext);
  const navigate = useNavigate();
  const loggedInUser = getUser();
  const token = getToken();
  const searchedUsers =
    userInput.trim()?.length > 0 &&
    postState?.users?.filter(
      ({ firstName, lastName, username }) =>
        firstName.toLowerCase().includes(userInput.trim().toLowerCase()) ||
        lastName.toLowerCase().includes(userInput.trim().toLowerCase()) ||
        username.toLowerCase().includes(userInput.trim().toLowerCase())
    );
  return (
    <>
      <input
        placeholder="Search People ..."
        className="search-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      {userInput.trim()?.length > 0 && (
        <div className="user-search-div">
          {searchedUsers?.length === 0 && (
            <div className="user-search-div no-border ">No users Found</div>
          )}
          <ul className="suggested-users">
            {searchedUsers.length > 0 &&
              searchedUsers?.map(
                ({ _id, firstName, lastName, username, profileAvatar }) => {
                  return (
                    <li key={_id} className="suggested-user">
                      <Link
                        to={`/profile/${username}`}
                        className="textdecoration-none"
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                          }}
                        >
                          <img
                            className="user-avatar-img"
                            src={profileAvatar}
                            alt="profile-avatar"
                          />
                          <div className="flex-col">
                            <span>
                              {firstName} {lastName}
                            </span>
                            <small>@{username}</small>
                          </div>
                        </div>
                      </Link>
                      {loggedInUser?.username !== username && (
                        <div
                          className="suggested-user-follow-btn"
                          onClick={() => {
                            if (loggedInUser) {
                              if (isUserFollowed(postState?.users, _id)) {
                                unFollowUser(token, _id, dispatchPost);
                              } else {
                                followUser(_id, token, dispatchPost);
                              }
                            } else {
                              toast.error("please login to follow");
                              navigate("/login");
                            }
                          }}
                        >
                          {isUserFollowed(postState?.users, _id)
                            ? "Unfollow"
                            : "Follow"}
                        </div>
                      )}
                    </li>
                  );
                }
              )}
          </ul>
        </div>
      )}
    </>
  );
};
