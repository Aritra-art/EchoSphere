import { useContext, useState } from "react";
import { getUser } from "../backend/utils/getUser";
import "./CreatePost.css";
import { DataContext } from "../context/DataContext";

export const CreatePost = () => {
  const [userInput, setUserInput] = useState("");
  const [userImage, setUserImage] = useState([]);
  console.log(userImage);
  const user = getUser();
  const { postState } = useContext(DataContext);

  const createPost = () => {};
  return (
    <>
      <div className="create-post-layout-container">
        <div className="create-post-layout">
          <div className="create-post-avatar">
            <img
              className="create-post-avatar-img"
              src={
                postState?.users?.find(
                  (dbUser) => dbUser.username === user.username
                )?.profileAvatar
              }
              alt="avatar"
            />
          </div>
          <div className="create-post-content">
            <div
              className="no-outline"
              role="textbox"
              contentEditable
              placeholder="What's happening?"
              onInput={(e) => setUserInput(e.target.textContent)}
            />
            {userImage.length > 0 &&
              userImage.map((img) => {
                return (
                  <div style={{ position: "relative" }} key={img.id}>
                    <img
                      src={URL.createObjectURL(img.image)}
                      alt="userimage"
                      className="user-input-image"
                    />
                    <span
                      className="image-xmark"
                      onClick={() =>
                        setUserImage((userImage) =>
                          userImage.filter(({ id }) => id !== img.id)
                        )
                      }
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </span>
                  </div>
                );
              })}
          </div>

          <div className="create-post-btns">
            <label>
              <i className="fa-solid fa-image"></i>
              <input
                type="file"
                accept="image/*"
                className="create-post-image-input"
                onChange={(e) => {
                  if (userImage.length === 2) {
                    alert("max 2 imgs");
                  } else {
                    setUserImage((userImage) => {
                      return [
                        ...userImage,
                        { id: Math.random(), image: e.target.files[0] },
                      ];
                    });
                  }
                }}
              />
            </label>

            <button
              onClick={createPost}
              className="create-post-post-btn"
              disabled={userInput.length === 0}
            >
              post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
