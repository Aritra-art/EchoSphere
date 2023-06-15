import { Link } from "react-router-dom";
import "./ShowFollowing.css";

export const ShowFollowing = ({ arr, setShowModal, showModal }) => {
  return (
    <div className="show-following-container-layout">
      <div className="modal-content">
        <div>
          {showModal?.type}
          <div className="modal-inner-content">
            {arr.length === 0 && <span>No users to Show</span>}
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
                          }}
                          to={`/profile/${username}`}
                          className="textdecoration-none"
                        >
                          {firstName}
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
