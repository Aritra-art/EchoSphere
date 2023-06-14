import { useContext } from "react";
import "./SuggestedUsers.css";
import { DataContext } from "../context/DataContext";
import { getUser } from "../backend/utils/getUser";
import { SearchPeople } from "./SearchPeople";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../backend/utils/getToken";
import { isUserFollowed } from "../backend/utils/isUserFollowed";
import { followUser } from "../backend/utils/followUser";
import { unFollowUser } from "../backend/utils/unFollowUser";

export const SuggestedUsers = () => {
  const { postState, dispatchPost } = useContext(DataContext);
  const token = getToken();
  const loggedInUser = getUser();

  const suggestedUsers = postState?.users?.filter(
    (user) => user?.username !== loggedInUser?.username
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="search-people-layout">
        <SearchPeople />
      </div>
      <div className="suggested-users-layout">
        <h3 className="margin-bottom">Who to Follow ?</h3>
        <hr />
        <ul className="suggested-users">
          {suggestedUsers.length > 0 &&
            suggestedUsers?.map(
              ({ _id, firstName, lastName, username, profileAvatar }) => {
                return (
                  <li key={_id} className="suggested-user">
                    <Link
                      className="textdecoration-none"
                      to={`/profile/${username}`}
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
                          alt="avatar"
                        />
                        <div className="flex-col">
                          <span style={{ fontSize: "1.09rem" }}>
                            {firstName} {lastName}
                          </span>
                          <small>@{username}</small>
                        </div>
                      </div>
                    </Link>

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
                          alert("please login to follow");
                          navigate("/login");
                        }
                      }}
                    >
                      {isUserFollowed(postState?.users, _id)
                        ? "Unfollow"
                        : "Follow"}
                    </div>
                  </li>
                );
              }
            )}
        </ul>
      </div>
    </>
  );
};