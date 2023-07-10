import { useContext, useState } from "react";
import { formatDate } from "../backend/utils/authUtils";
import "./ShowEdit.css";
import { updateUser } from "../backend/utils/updateUser";
import { DataContext } from "../context/DataContext";
import { AvatarModal } from "./AvatarModal";

export const ShowEdit = ({ obj, type, setEditProfile }) => {
  const { postState, dispatchPost } = useContext(DataContext);
  const [showModal, setShowModal] = useState({
    show: false,
    type: "",
  });
  const [userInput, setUserInput] = useState({
    _id: obj._id,
    firstName: obj?.firstName,
    lastName: obj?.lastName,
    username: obj?.username,
    password: obj?.password,
    createdAt: obj?.createdAt,
    updatedAt: formatDate(),
    profileAvatar: postState?.users?.find((user) => user?._id === obj?._id)
      ?.profileAvatar,
    bio: obj?.bio,
    website: obj?.website,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((userInput) => ({ ...userInput, [name]: value }));
  };
  const updateUserHandler = (e) => {
    e.preventDefault();
    updateUser(userInput, dispatchPost, setEditProfile);
  };
  return (
    <>
      {showModal.show && (
        <AvatarModal
          showModal={showModal}
          setShowModal={setShowModal}
          setUserInput={setUserInput}
        />
      )}
      <div className="show-following-container-layout">
        <div className="modal-content edit-form-layout">
          <div>
            <span>{type}</span>
            <div>
              <form className="show-edit-form" onSubmit={updateUserHandler}>
                <label>
                  <span style={{ position: "relative" }}>
                    <img
                      src={
                        typeof userInput?.profileAvatar === "string"
                          ? userInput?.profileAvatar
                          : URL.createObjectURL(userInput?.profileAvatar)
                      }
                      className="single-user-avatar"
                    />
                    <i className="fa-solid fa-camera"></i>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="create-post-image-input"
                    onChange={(e) => {
                      setUserInput((userInput) => ({
                        ...userInput,
                        profileAvatar: e.target.files[0],
                      }));
                    }}
                  />
                </label>
                <button
                  className="update-btn"
                  style={{ margin: "0" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal((showModal) => ({
                      ...showModal,
                      type: "Choose a Avatar",
                      show: true,
                    }));
                  }}
                >
                  Set Avatar
                </button>
                <label className="editform-label">
                  First Name{" "}
                  <input
                    className="editform-label-input"
                    name="firstName"
                    value={userInput?.firstName}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="editform-label">
                  Last Name{" "}
                  <input
                    className="editform-label-input"
                    name="lastName"
                    value={userInput?.lastName}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="editform-label">
                  Bio{" "}
                  <textarea
                    className="editform-label-input"
                    name="bio"
                    value={userInput?.bio}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="editform-label">
                  Website{" "}
                  <input
                    className="editform-label-input"
                    type="website"
                    name="website"
                    value={userInput?.website}
                    onChange={handleInputChange}
                  />
                </label>
                <button
                  style={{ width: "100%", margin: "0" }}
                  className="update-btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    setUserInput((userInput) => ({
                      ...userInput,
                      profileAvatar:
                        "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png",
                    }));
                  }}
                >
                  Remove Profile Photo
                </button>
                <button
                  style={{ width: "100%" }}
                  className="update-btn"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          </div>

          <div
            className="modal-cross"
            onClick={() => {
              setEditProfile((editProfile) => ({
                ...editProfile,
                show: false,
              }));
            }}
          >
            X
          </div>
        </div>
      </div>
    </>
  );
};
