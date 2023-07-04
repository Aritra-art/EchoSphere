import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { getUser } from "../backend/utils/getUser";
import "./AddComment.css";

import { addPostCommentService } from "../services/addPostCommentService";
import { toast } from "react-hot-toast";
import { editPostComment } from "../backend/utils/editPostComment";

export const AddComment = ({ fromEdit, postId, editId, comment, setEdit }) => {
  const { postState, dispatchPost } = useContext(DataContext);
  const [userComment, setUserComment] = useState(!fromEdit ? "" : comment);
  const user = getUser();
  const profileAvatar = postState?.users?.find(
    (u) => u?.username === user?.username
  )?.profileAvatar;

  const addPostComment = async (postId) => {
    try {
      const response = await addPostCommentService(postId, {
        comment: userComment,
      });
      if (response?.status === 201) {
        dispatchPost({
          type: "SET_ALL_POSTS",
          payload: response?.data?.posts,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="add-comment-layout-container">
        <div>
          <img
            className="user-avatar-img"
            style={{ width: "3rem", height: "3rem" }}
            src={profileAvatar}
            alt="avatar"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            placeholder="comment . . ."
            className="comment-input"
            style={{
              width: `${fromEdit ? "14rem" : "17rem"}`,
              marginRight: `${!fromEdit ? "1rem" : "0"}`,
            }}
            value={userComment}
            onChange={(e) => {
              setUserComment(() => e.target.value);
            }}
          />
          {fromEdit && (
            <span
              className="cross-btn"
              onClick={() => {
                setEdit(() => ({ [editId]: false }));
              }}
            >
              X
            </span>
          )}
          <i
            className="fa-solid fa-paper-plane"
            style={{
              color: `${
                userComment?.trim()?.length === 0 ? "gray" : "#ff3b30"
              }`,
              cursor: `${
                userComment?.trim()?.length === 0 ? "not-allowed" : "pointer"
              }`,
            }}
            onClick={() => {
              if (userComment?.trim()?.length > 0) {
                if (!fromEdit) {
                  toast.promise(addPostComment(postId), {
                    loading: "Commenting...",
                    success: <b>Commented!</b>,
                    error: <b>Could not comment.</b>,
                  });
                } else {
                  toast.promise(
                    editPostComment(postId, editId, userComment, dispatchPost),
                    {
                      loading: "Updating...",
                      success: <b>Comment updated!</b>,
                      error: <b>Could not update.</b>,
                    }
                  );

                  setEdit(() => ({ [editId]: false }));
                }

                setUserComment(() => "");
              }
            }}
          ></i>
        </div>
      </div>
    </>
  );
};
