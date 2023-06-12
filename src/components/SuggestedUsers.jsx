import { useContext } from "react";
import "./SuggestedUsers.css";
import { DataContext } from "../context/DataContext";
import { getUser } from "../backend/utils/getUser";
import { SearchPeople } from "./SearchPeople";

export const SuggestedUsers = () => {
  const { postState } = useContext(DataContext);
  const loggedInUser = getUser();
  const suggestedUsers = postState?.users?.filter(
    (user) => user?.username !== loggedInUser?.username
  );
  return (
    <>
      <div className="search-people-layout">
        <SearchPeople />
      </div>
      <div className="suggested-users-layout">
        <h2>Suggested Users</h2>
        <ul className="suggested-users">
          {suggestedUsers.length > 0 &&
            suggestedUsers?.map(
              ({ _id, firstName, lastName, username, profileAvatar }) => {
                return (
                  <li key={_id} className="suggested-user">
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
                        <span>
                          {firstName} {lastName}
                        </span>
                        <small>@{username}</small>
                      </div>
                    </div>
                    <div className="suggested-user-follow-btn">follow</div>
                  </li>
                );
              }
            )}
        </ul>
      </div>
    </>
  );
};
