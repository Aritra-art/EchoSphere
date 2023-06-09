import { getPostDate } from "../backend/utils/getPostDate";
import "./PostCard.css";

export const Postcard = ({ data }) => {
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
                  <i className="fa-regular fa-heart">
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
