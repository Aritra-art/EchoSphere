import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePostService } from "../services/getSinglePostService";
import { getToken } from "../backend/utils/getToken";
import { getUser } from "../backend/utils/getUser";
import { addToBookmarkHandler } from "../services/addToBookmarkHandler";
import { removeFromBookmarkHandler } from "../services/removeFromBookmarkHandler";
import { postDislikeHandler } from "../services/postDislikeHandler";
import { postLikeHandler } from "../services/postLikeHandler";
import { isPostLiked } from "../backend/utils/isPostLiked";
import { DataContext } from "../context/DataContext";
import { getPostDate } from "../backend/utils/getPostDate";
import { Navbar } from "../components/Navbar";
import { ShowFollowing } from "../components/ShowFollowing";

export const SinglePost = () => {
  const [singlePost, setSinglePost] = useState({});
  const [showModal, setShowModal] = useState({
    show: false,
    type: "",
  });
  const { postState, dispatchPost } = useContext(DataContext);
  const { postId } = useParams();
  const getSinglePost = async () => {
    try {
      const response = await getSinglePostService(postId);
      if (response?.status === 200) {
        setSinglePost(response?.data?.post);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSinglePost();
  }, [postId, postState?.posts]);
  const token = getToken();
  const user = getUser();

  return (
    <>
      <Navbar from="Post" />
      {showModal.show && (
        <ShowFollowing
          arr={singlePost?.likes?.likedBy}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}

      <div style={{ marginBottom: "4rem" }}></div>
      {Object.keys(singlePost)?.length > 0 && (
        <div className="postcard-layout">
          <div className="postcard-header-layout">
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <img
                className="user-avatar-img"
                src={
                  postState?.users?.find(
                    ({ username }) => username === singlePost?.username
                  ).profileAvatar
                }
                alt="avatar"
              />
              <span style={{ alignSelf: "center" }}>
                <span className="post-fullname">
                  {
                    postState?.users?.find(
                      (user) => user.username === singlePost?.username
                    )?.firstName
                  }{" "}
                  {
                    postState?.users?.find(
                      (user) => user.username === singlePost?.username
                    )?.lastName
                  }
                </span>{" "}
                . {getPostDate(singlePost?.createdAt)}
                <p>@{singlePost?.username}</p>
              </span>
            </div>

            <i className="fa-solid fa-ellipsis"></i>
          </div>
          <div className="postcard-content">{singlePost?.content}</div>
          <div>
            <img
              src={singlePost?.postImage}
              className="postcard-content-img"
              alt="postImage"
            />
          </div>
          <hr />
          {singlePost?.likes?.likeCount > 0 && (
            <>
              <p
                style={{
                  margin: "0.5rem 0",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowModal((showModal) => ({
                    ...showModal,
                    show: true,
                    type: "LIKED BY",
                  }));
                }}
              >
                <span
                  style={{
                    color: "#ff3b30",
                    fontWeight: "bold",
                    marginRight: "0.3rem",
                  }}
                >
                  {singlePost?.likes?.likeCount}
                </span>
                Like{singlePost?.likes?.likeCount > 1 ? "s" : ""}
              </p>
              <hr />
            </>
          )}

          <div className="card-action-buttons">
            <i
              className={`${
                isPostLiked(singlePost?.likes, user) ? "fa solid" : "fa-regular"
              } fa-heart`}
              onClick={() => {
                if (!token) {
                  alert("please login to continue");
                } else {
                  if (!isPostLiked(singlePost?.likes, user)) {
                    postLikeHandler(token, singlePost?._id, dispatchPost);
                  } else {
                    postDislikeHandler(token, singlePost?._id, dispatchPost);
                  }
                }
              }}
            >
              <span className="margin-left">
                {singlePost?.likes?.likeCount}
              </span>
            </i>
            <i className="fa-regular fa-comment"></i>
            <i
              className={`${
                postState.bookmarks.includes(singlePost?._id)
                  ? "fa-solid"
                  : "fa-regular"
              } fa-bookmark`}
              onClick={() => {
                if (!token) {
                  alert("please login to continue");
                } else {
                  if (postState.bookmarks.includes(singlePost?._id)) {
                    removeFromBookmarkHandler(
                      token,
                      singlePost?._id,
                      dispatchPost
                    );
                  } else {
                    addToBookmarkHandler(token, singlePost?._id, dispatchPost);
                  }
                }
              }}
            ></i>
            <i className="fas fa-share"></i>
          </div>
        </div>
      )}
    </>
  );
};
