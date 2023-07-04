import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import "./ShowComments.css";
import { getPostDate } from "../backend/utils/getPostDate";
import { getPostCommentsService } from "../services/getPostCommentsService";
import { getUser } from "../backend/utils/getUser";
import { deleteCommentHandler } from "../backend/utils/deleteCommentHandler";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AddComment } from "./AddComment";

export const ShowComments = ({ postId }) => {
  const { postState, dispatchPost } = useContext(DataContext);
  const [edit, setEdit] = useState({
    id: false,
  });
  const user = getUser();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const getPostComments = async (postId) => {
    try {
      const response = await getPostCommentsService(postId);
      if (response?.status === 200) {
        setComments(response?.data?.comments);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPostComments(postId);
  }, [postId, postState]);
  return (
    <div className="comment-section-layout">
      {comments?.length > 0 &&
        comments?.map(({ id, createdAt, username, comment }) => {
          return (
            <div key={id}>
              {edit[id] && (
                <AddComment
                  fromEdit
                  postId={postId}
                  editId={id}
                  comment={comment}
                  setEdit={setEdit}
                />
              )}
              {!edit[id] && (
                <div className="comment-card">
                  <div
                    onClick={() => navigate(`/profile/${username}`)}
                    className="pointer"
                  >
                    <img
                      className="user-avatar-img"
                      style={{ width: "3rem", height: "3rem" }}
                      src={
                        postState?.users?.find(
                          (user) => user.username === username
                        )?.profileAvatar
                      }
                      alt="avatar"
                    />
                  </div>
                  <div style={{ alignSelf: "center" }}>
                    <span
                      className="pointer"
                      onClick={() => {
                        navigate(`/profile/${username}`);
                      }}
                    >
                      <span className="post-fullname">
                        {
                          postState?.users?.find((u) => u.username === username)
                            ?.firstName
                        }{" "}
                        {
                          postState?.users?.find((u) => u.username === username)
                            ?.lastName
                        }
                      </span>{" "}
                      . <small>{getPostDate(createdAt)}</small>
                      <span style={{ marginLeft: "0.5rem" }}></span>
                      <p>@{username}</p>
                    </span>

                    <div
                      style={{
                        color: "#ff3b30",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {comment}
                    </div>
                  </div>
                  {user && user?.username === username && (
                    <span className="comment-action-btns">
                      {" "}
                      <i
                        className="fa-solid fa-trash pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.promise(
                            deleteCommentHandler(postId, id, dispatchPost),
                            {
                              loading: "Deleting...",
                              success: <b>Deleted!</b>,
                              error: <b>Could not delete.</b>,
                            }
                          );
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-pen pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEdit(() => ({ [id]: true }));
                        }}
                      ></i>
                    </span>
                  )}
                </div>
              )}

              {comments.length > 1 && <hr />}
            </div>
          );
        })}
    </div>
  );
};
