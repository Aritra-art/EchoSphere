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
                  <img
                    className="user-avatar-img"
                    src="https://picsum.photos/id/67/60/60"
                  />
                  <div className="postcard-header-name">
                    <span>
                      <span className="post-fullname">{fullname}</span> .{" "}
                      {getPostDate(createdAt)}
                      <p>@{username}</p>
                    </span>

                    <i className="fas fa-ellipsis"></i>
                  </div>
                </div>
                <div className="postcard-content">{content}</div>
                <div className="postcard-content-img">
                  <img src={postImage} className="postcard-content-img" />
                </div>
                <hr />
                <div className="card-action-buttons">
                  <i className="fa-regular fa-heart">
                    <span className="margin-left">{likes?.likeCount}</span>
                  </i>
                  <i class="fa-regular fa-comment"></i>
                  <i class="fa-regular fa-bookmark"></i>
                  <i class="fas fa-share"></i>
                </div>
              </div>
            );
          }
        )}
    </>
  );
};
