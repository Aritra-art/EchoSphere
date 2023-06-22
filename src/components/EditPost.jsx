import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import "./EditPost.css";
import { editPostUtil } from "../backend/utils/editPostUtil";

export const EditPost = ({ editId, setShowEditModal }) => {
  const { postState, dispatchPost } = useContext(DataContext);
  const [editPost, setEditPost] = useState({
    content: postState?.posts?.find(({ _id }) => _id === editId)?.content,
    postImage: () => {
      let newPostImage = [];
      const initialPostImage = postState?.posts?.find(
        ({ _id }) => _id === editId
      )?.postImage;
      for (let img of initialPostImage) {
        newPostImage = [...newPostImage, { id: Math.random(), image: img }];
      }
      return newPostImage;
    },
    userImage: [],
  });
  return (
    <div className="show-following-container-layout">
      <div className="modal-content">
        <div>
          <textarea
            name="content"
            value={editPost.content}
            onChange={(e) =>
              setEditPost((editPost) => ({
                ...editPost,
                content: e.target.value,
              }))
            }
            className="edit-post-edit-content"
          />
          {editPost.postImage().length > 0 &&
            editPost?.postImage()?.map((img) => {
              return (
                <div key={img.id} style={{ position: "relative" }}>
                  <img
                    src={img.image}
                    alt="postimg"
                    className="user-input-image"
                  />
                  <span
                    className="image-xmark"
                    onClick={() => {
                      console.log(editPost?.postImage());

                      setEditPost((editPost) => ({
                        ...editPost,
                        postImage: () => {
                          return editPost
                            ?.postImage()
                            ?.filter(({ image }) => image !== img.image);
                        },
                      }));
                    }}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </span>
                </div>
              );
            })}
          {editPost?.userImage?.length > 0 &&
            editPost?.userImage?.map((img) => {
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
                      setEditPost((editPost) => ({
                        ...editPost,
                        userImage: editPost?.userImage?.filter(
                          ({ id }) => id !== img.id
                        ),
                      }))
                    }
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </span>
                </div>
              );
            })}
          <label>
            <i className="fa-solid fa-image"></i>
            <input
              type="file"
              accept="image/*"
              className="create-post-image-input"
              onChange={(e) => {
                if (
                  Number(editPost?.userImage?.length) +
                    Number(editPost?.postImage()?.length) ===
                  2
                ) {
                  alert("Max 2 images can be uploaded");
                } else {
                  setEditPost((editPost) => ({
                    ...editPost,
                    userImage: [
                      ...editPost?.userImage,
                      { id: Math.random(), image: e.target.files[0] },
                    ],
                  }));
                }
              }}
            />
          </label>
          <button
            onClick={() => {
              editPostUtil(editId, editPost, dispatchPost);
              setShowEditModal((showEditModal) => ({
                ...showEditModal,
                show: false,
              }));
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setShowEditModal((showEditModal) => ({
                ...showEditModal,
                show: false,
              }));
            }}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};
