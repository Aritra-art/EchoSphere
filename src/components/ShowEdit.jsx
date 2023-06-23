import { useContext, useState } from "react";
import { formatDate } from "../backend/utils/authUtils";
import "./ShowEdit.css";
import { updateUser } from "../backend/utils/updateUser";
import { DataContext } from "../context/DataContext";

export const ShowEdit = ({ obj, type, setEditProfile }) => {
  const { dispatchPost } = useContext(DataContext);
  const [userInput, setUserInput] = useState({
    _id: obj._id,
    firstName: obj?.firstName,
    lastName: obj?.lastName,
    username: obj?.username,
    password: obj?.password,
    createdAt: obj?.createdAt,
    updatedAt: formatDate(),
    profileAvatar: obj?.profileAvatar,
    bio: obj?.bio,
    website: obj?.website,
  });

  console.log(typeof userInput?.profileAvatar);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((userInput) => ({ ...userInput, [name]: value }));
  };
  const updateUserHandler = (e) => {
    e.preventDefault();
    updateUser(userInput, dispatchPost, setEditProfile);
  };
  return (
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
                  {/* <i className="fa-solid fa-camera"></i> */}
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
                className="update-btn"
                type="submit"
                // onClick={(e) => {
                //   e.target.innerText = "Updating . . .";
                // }}
              >
                Update
              </button>
            </form>
          </div>
        </div>

        <div
          className="modal-cross"
          onClick={() => {
            setEditProfile((editProfile) => ({ ...editProfile, show: false }));
          }}
        >
          X
        </div>
      </div>
    </div>
  );
};
