import { Link } from "react-router-dom";
import "./ShowFollowing.css";
export const ShowFollowing = ({
  arr,
  setShowModal,
  showModal,
  fromLoginPage,
  selectedUser,
}) => {
  return (
    <div className="show-following-container-layout">
      <div className="modal-content">
        <div>
          {showModal?.type}
          <div className="modal-inner-content">
            {arr.length === 0 && <span>No users to show</span>}
            {arr.length > 0 && (
              <ol style={{ listStyle: "none" }}>
                {arr.map(
                  ({ _id, firstName, lastName, username, profileAvatar }) => {
                    return (
                      <li key={_id}>
                        <Link
                          onClick={() => {
                            setShowModal((showModal) => ({
                              ...showModal,
                              show: false,
                            }));
                            selectedUser(username);
                          }}
                          to={!fromLoginPage && `/profile/${username}`}
                          className="textdecoration-none"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              alignItems: "center",
                              margin: "1rem 0",
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
                      </li>
                    );
                  }
                )}
              </ol>
            )}
          </div>
        </div>
        <div
          className="modal-cross"
          onClick={() => {
            setShowModal((showModal) => ({ ...showModal, show: false }));
          }}
        >
          X
        </div>
      </div>
    </div>
  );
};
