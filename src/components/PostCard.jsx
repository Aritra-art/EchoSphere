import { useContext } from "react";
import { getPostDate } from "../backend/utils/getPostDate";
import { getToken } from "../backend/utils/getToken";
import { DataContext } from "../context/DataContext";
import { postLikeHandler } from "../services/postLikeHandler";
import "./PostCard.css";
import { getUser } from "../backend/utils/getUser";
import { isPostLiked } from "../backend/utils/isPostLiked";
import { postDislikeHandler } from "../services/postDislikeHandler";

export const Postcard = ({ data }) => {
  const { dispatchPost } = useContext(DataContext);
  const token = getToken();
  const user = getUser();
  return (
    <>
      {data?.length > 0 &&
        data.map(
          ({
            _id,
            content,
            likes,
            fullname,
            username,
            postImage,
            createdAt,
          }) => {
            return (
              <div key={_id} className="postcard-layout">
                <div className="postcard-header-layout">
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <img
                      className="user-avatar-img"
                      src="https://picsum.photos/id/67/60/60"
                    />
                    <span style={{ alignSelf: "center" }}>
                      <span className="post-fullname">{fullname}</span> .{" "}
                      {getPostDate(createdAt)}
                      <p>@{username}</p>
                    </span>
                  </div>

                  <i className="fa-solid fa-ellipsis"></i>
                </div>
                <div className="postcard-content">{content}</div>
                <div>
                  <img src={postImage} className="postcard-content-img" />
                </div>
                <hr />
                <div className="card-action-buttons">
                  <i
                    className={`${
                      isPostLiked(likes, user) ? "fa solid" : "fa-regular"
                    } fa-heart`}
                    onClick={() => {
                      if (token?.length === 0) {
                        alert("please login to continue");
                      } else {
                        if (!isPostLiked(likes, user)) {
                          postLikeHandler(token, _id, dispatchPost);
                        } else {
                          postDislikeHandler(token, _id, dispatchPost);
                        }
                      }
                    }}
                  >
                    <span className="margin-left">{likes?.likeCount}</span>
                  </i>
                  <i className="fa-regular fa-comment"></i>
                  <i className="fa-regular fa-bookmark"></i>
                  <i className="fas fa-share"></i>
                </div>
              </div>
            );
          }
        )}
    </>
  );
};
