import { useContext, useEffect, useState } from "react";
import { getUser } from "../backend/utils/getUser";
import "./CreatePost.css";
import { DataContext } from "../context/DataContext";
import { getToken } from "../backend/utils/getToken";
import { createPost } from "../backend/utils/createPost";

export const CreatePost = () => {
  const [userInput, setUserInput] = useState("");
  const [userImage, setUserImage] = useState([]);
  const { dispatchPost } = useContext(DataContext);
  const user = getUser();
  const token = getToken();
  const { postState } = useContext(DataContext);

  console.log(userImage);

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
              onInput={(e) => {
                setUserInput(e.target.innerText);
              }}
              className="no-outline"
              role="textbox"
              contentEditable="true"
              placeholder="What's happening?"
            />
            {userImage.length > 0 &&
              userImage.map((img) => {
                console.log(img.image.type.split("/")[0]);
                return (
                  <div style={{ position: "relative" }} key={img.id}>
                    {img?.image?.type?.split("/")[0] === "image" && (
                      <img
                        src={URL.createObjectURL(img.image)}
                        alt="userimage"
                        className="user-input-image"
                      />
                    )}
                    {img?.image?.type?.split("/")[0] === "video" && (
                      <video
                        controls
                        className="user-input-image"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      >
                        <source src={URL.createObjectURL(img.image)} />
                      </video>
                    )}
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
                    alert("max 2 items");
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
            <label>
              {/* <i className="fa-solid fa-video"></i> */}
              <input
                type="file"
                accept="video/*"
                className="create-post-image-input"
                onChange={(e) => {
                  if (userImage.length === 2) {
                    alert("max 2 items");
                  } else {
                    if (e.target.files[0]?.size / 10240000 > 1) {
                      alert("Video should not be more than 10mb");
                    } else {
                      setUserImage((userImage) => {
                        return [
                          ...userImage,
                          { id: Math.random(), image: e.target.files[0] },
                        ];
                      });
                    }
                  }
                }}
              />
            </label>

            <button
              onClick={() => {
                createPost(userInput, userImage, dispatchPost);
                document.querySelector(".no-outline").innerText = "";
                setUserImage(() => []);
              }}
              className="create-post-post-btn"
              disabled={
                userImage.length === 0 && userInput?.trim()?.length === 0
              }
            >
              post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
