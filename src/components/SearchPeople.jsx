import { useContext, useState } from "react";
import "./SearchPeople.css";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";

export const SearchPeople = () => {
  const [userInput, setUserInput] = useState("");
  const { postState } = useContext(DataContext);
  const searchedUsers =
    userInput.trim()?.length > 0 &&
    postState?.users?.filter(({ firstName }) =>
      firstName.toLowerCase().includes(userInput.trim().toLowerCase())
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
                            alt="avatar"
                          />
                          <div className="flex-col">
                            <span>
                              {firstName} {lastName}
                            </span>
                            <small>@{username}</small>
                          </div>
                        </div>
                      </Link>

                      <div className="suggested-user-follow-btn">Follow</div>
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
