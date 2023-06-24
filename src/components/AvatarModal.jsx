import { useContext, useState } from "react";
import { avatarDb } from "../backend/utils/avatarDb";
import { getUser } from "../backend/utils/getUser";
import { DataContext } from "../context/DataContext";

export const AvatarModal = ({ showModal, setShowModal, setUserInput }) => {
  const [border, setBorder] = useState({});
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const { postState } = useContext(DataContext);
  const user = getUser();
  const loggedInUserProfileAvatar = postState?.users?.find(
    (u) => u?._id === user?._id
  )?.profileAvatar;

  return (
    <div className="show-following-container-layout" style={{ zIndex: "5" }}>
      <div className="modal-content">
        <div>
          {showModal.type}
          <div className="modal-inner-content">
            {avatarDb &&
              avatarDb
                .filter((avatar) => avatar !== loggedInUserProfileAvatar)
                .map((avatar) => (
                  <img
                    src={avatar}
                    className="user-avatar-img "
                    style={{
                      width: "7rem",
                      height: "7rem",
                      margin: "0.4rem",
                      border: `${
                        border[avatar]
                          ? `2px solid ${border[avatar]}`
                          : "2px solid black"
                      }`,
                      cursor: "pointer",
                    }}
                    key={avatar}
                    alt={avatar}
                    onClick={() => {
                      setBorder(() => ({ [avatar]: "#ff3b30" }));
                      setSelectedAvatar(() => avatar);
                    }}
                  />
                ))}
            <button
              className="update-btn"
              style={{ width: "100%" }}
              onClick={() => {
                if (selectedAvatar.length === 0) {
                  alert("please select a avatar");
                } else {
                  setUserInput((userInput) => ({
                    ...userInput,
                    profileAvatar: selectedAvatar,
                  }));
                  setShowModal((showModal) => ({
                    ...showModal,
                    show: false,
                  }));
                }
              }}
            >
              Update Avatar
            </button>
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
