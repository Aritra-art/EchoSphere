import { useContext } from "react";
import { getPostDate } from "../backend/utils/getPostDate";
import { getToken } from "../backend/utils/getToken";
import { DataContext } from "../context/DataContext";
import { postLikeHandler } from "../services/postLikeHandler";
import "./PostCard.css";
import { getUser } from "../backend/utils/getUser";
import { isPostLiked } from "../backend/utils/isPostLiked";
import { postDislikeHandler } from "../services/postDislikeHandler";
import { addToBookmarkHandler } from "../services/addToBookmarkHandler";
import { removeFromBookmarkHandler } from "../services/removeFromBookmarkHandler";
import { Link } from "react-router-dom";

export const Postcard = ({ data }) => {
  const { postState, dispatchPost } = useContext(DataContext);

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
                      src={
                        postState?.users?.find(
                          (user) => user.username === username
                        )?.profileAvatar
                      }
                      alt="avatar"
                    />
                    <span style={{ alignSelf: "center" }}>
                      <span className="post-fullname">{fullname}</span> .{" "}
                      {getPostDate(createdAt)}
                      <p>@{username}</p>
                    </span>
                  </div>

                  <i className="fa-solid fa-ellipsis"></i>
                </div>
                <Link to={`/post/${_id}`} className="textdecoration-none">
                  <div className="postcard-content">{content}</div>
                  <div>
                    <img
                      src={postImage}
                      className="postcard-content-img"
                      alt="postImage"
                    />
                  </div>
                </Link>

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
                  <i
                    className={`${
                      postState.bookmarks.includes(_id)
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark`}
                    onClick={() => {
                      if (token?.length === 0) {
                        alert("please login to continue");
                      } else {
                        if (postState.bookmarks.includes(_id)) {
                          removeFromBookmarkHandler(token, _id, dispatchPost);
                        } else {
                          addToBookmarkHandler(token, _id, dispatchPost);
                        }
                      }
                    }}
                  ></i>
                  <i className="fas fa-share"></i>
                </div>
              </div>
            );
          }
        )}
    </>
  );
};
