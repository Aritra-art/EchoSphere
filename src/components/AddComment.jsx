import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { getUser } from "../backend/utils/getUser";
import "./AddComment.css";

import { addPostCommentService } from "../services/addPostCommentService";

export const AddComment = ({ postId }) => {
  const { postState, dispatchPost } = useContext(DataContext);
  const [userComment, setUserComment] = useState("");
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
          <img className="user-avatar-img" src={profileAvatar} alt="avatar" />
        </div>
        <div>
          <input
            placeholder="comment . . ."
            className="comment-input"
            value={userComment}
            onChange={(e) => {
              setUserComment(() => e.target.value);
            }}
          />
          <i
            className="fa-solid fa-paper-plane"
            onClick={() => {
              if (userComment?.trim()?.length > 0) {
                addPostComment(postId);
                setUserComment(() => "");
              }
            }}
          ></i>
        </div>
      </div>
    </>
  );
};
