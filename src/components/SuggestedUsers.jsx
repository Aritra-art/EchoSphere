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
import { toast } from "react-hot-toast";
import { UserCardShimmer } from "./UserCardShimmer";

export const SuggestedUsers = () => {
  const { postState, dispatchPost } = useContext(DataContext);
  const token = getToken();
  const loggedInUser = getUser();

  const suggestedUsers = () => {
    const suggestedUsers = postState?.users.filter(
      ({ username, followers }) => {
        if (username === loggedInUser?.username) {
          return false;
        } else if (followers.length === 0) {
          return true;
        } else {
          return followers.some(
            ({ username }) => username !== loggedInUser?.username
          );
        }
      }
    );
    return suggestedUsers?.length > 3
      ? suggestedUsers.splice(0, 3)
      : suggestedUsers;
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="search-people-layout">
        <SearchPeople />
      </div>
      <div className="suggested-users-layout">
        <h3 className="margin-bottom">Who to Follow ?</h3>
        <hr />
        {postState?.loading && <UserCardShimmer />}
        <ul className="suggested-users">
          {suggestedUsers().length > 0 &&
            suggestedUsers()?.map(
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
                          toast.error("please login to follow");
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
