import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import "./ShowComments.css";
import { getPostDate } from "../backend/utils/getPostDate";

export const ShowComments = ({ postId }) => {
  const { postState } = useContext(DataContext);
  const comments = postState?.posts?.find(
    ({ _id }) => _id === postId
  )?.comments;
  return (
    <div className="comment-section-layout">
      {comments?.map(({ id, createdAt, username, comment }) => {
        return (
          <div key={id}>
            <div className="comment-card">
              <div>
                <img
                  className="user-avatar-img"
                  src={
                    postState?.users?.find((user) => user.username === username)
                      ?.profileAvatar
                  }
                  alt="avatar"
                />
              </div>
              <div style={{ alignSelf: "center" }}>
                <span>
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
                  <p>@{username}</p>
                </span>
                <div
                  style={{
                    color: "#ff3b30",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {comment}
                </div>
              </div>
            </div>

            {comments.length > 1 && <hr />}
          </div>
        );
      })}
    </div>
  );
};
