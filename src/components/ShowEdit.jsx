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
      <div className="modal-content">
        <div>
          <span>{type}</span>
          <div className="">
            <form className="show-edit-form" onSubmit={updateUserHandler}>
              <label>
                First Name{" "}
                <input
                  name="firstName"
                  value={userInput?.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Last Name{" "}
                <input
                  name="lastName"
                  value={userInput?.lastName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Bio{" "}
                <textarea
                  name="bio"
                  value={userInput?.bio}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Website{" "}
                <input
                  type="website"
                  name="website"
                  value={userInput?.website}
                  onChange={handleInputChange}
                />
              </label>
              <button
                type="submit"
                onClick={(e) => {
                  e.target.innerText = "Updating . . .";
                }}
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
