import { useContext, useEffect, useState } from "react";
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
import { isUserFollowed } from "../backend/utils/isUserFollowed";
import { followUser } from "../backend/utils/followUser";
import { unFollowUser } from "../backend/utils/unFollowUser";
import Linkify from "react-linkify";
import { DelModal } from "./DelModal";
import { EditPost } from "./EditPost";
import { componentDecorator } from "../backend/utils/componentDecorator";
import { toast } from "react-hot-toast";
import { ShareModal } from "./ShareModal";
import ModalImage from "react-modal-image";

export const Postcard = ({ data }) => {
  const { postState, dispatchPost } = useContext(DataContext);
  const [showEllipsisContent, setShowEllipsisContent] = useState({ id: false });
  const [showDelModal, setShowDelModal] = useState({ show: false, id: "" });
  const [showEditModal, setShowEditModal] = useState({ show: false, id: "" });
  const [showShare, setShowShare] = useState({ id: "", show: false });
  const token = getToken();
  const user = getUser();

  useEffect(() => {
    document.addEventListener("click", () => {
      setShowEllipsisContent(() => ({ id: false }));
    });
  }, []);

  return (
    <>
      {showDelModal.show && (
        <DelModal setShowModal={setShowDelModal} postId={showDelModal?.id} />
      )}
      {showShare?.show && (
        <ShareModal setShowShare={setShowShare} id={showShare?.id} />
      )}
      {showEditModal.show && (
        <EditPost
          editId={showEditModal.id}
          setShowEditModal={setShowEditModal}
        />
      )}
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
            comments,
          }) => {
            return (
              <div
                key={_id}
                className="postcard-layout"
                onClick={() => {
                  setShowEllipsisContent(() => ({ [_id]: false }));
                }}
              >
                <div className="postcard-header-layout">
                  <Link
                    to={`/profile/${username}`}
                    className="textdecoration-none"
                  >
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
                        <span className="post-fullname">
                          {
                            postState?.users?.find(
                              (u) => u.username === username
                            )?.firstName
                          }{" "}
                          {
                            postState?.users?.find(
                              (u) => u.username === username
                            )?.lastName
                          }
                        </span>{" "}
                        . <small>{getPostDate(createdAt)}</small>
                        <p>@{username}</p>
                      </span>
                    </div>
                  </Link>

                  {!showEllipsisContent[_id] && token && (
                    <i
                      className="fa-solid fa-ellipsis"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEllipsisContent(() => ({ [_id]: true }));
                      }}
                    ></i>
                  )}
                  {showEllipsisContent[_id] && (
                    <div className="post-ellipsis-layout">
                      {token && user?.username === username && (
                        <div className="post-ellipsis-container">
                          <div
                            onClick={() => {
                              setShowEditModal((showEditModal) => ({
                                ...showEditModal,
                                show: true,
                                id: _id,
                              }));
                            }}
                            className="post-ellipsis-container-pill"
                          >
                            Edit
                          </div>
                          <div
                            className="post-ellipsis-container-pill"
                            onClick={() => {
                              setShowDelModal((showDelModal) => ({
                                ...showDelModal,
                                show: true,
                                id: _id,
                              }));
                            }}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                      {token && user?.username !== username && (
                        <div className="post-ellipsis-container">
                          <div
                            className="post-ellipsis-container-pill"
                            onClick={() => {
                              if (
                                isUserFollowed(
                                  postState?.users,
                                  postState?.users?.find(
                                    (user) => user?.username === username
                                  )._id
                                )
                              ) {
                                unFollowUser(
                                  token,
                                  postState?.users?.find(
                                    (user) => user?.username === username
                                  )._id,
                                  dispatchPost
                                );
                              } else {
                                followUser(
                                  postState?.users?.find(
                                    (user) => user?.username === username
                                  )._id,
                                  token,
                                  dispatchPost
                                );
                              }
                            }}
                          >
                            {isUserFollowed(
                              postState?.users,
                              postState?.users?.find(
                                (user) => user?.username === username
                              )._id
                            )
                              ? "Unfollow"
                              : "Follow"}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Link to={`/post/${_id}`} className="textdecoration-none">
                  <div className="postcard-content">
                    <Linkify componentDecorator={componentDecorator}>
                      {content}
                    </Linkify>
                  </div>
                </Link>
                {postImage.length > 0 &&
                  postImage.map((img, id) => {
                    return (
                      <div key={id}>
                        {img.split("/")[4] === "video" ? (
                          <video
                            loop
                            autoPlay
                            controls
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "contain",
                            }}
                          >
                            <source src={img} />
                          </video>
                        ) : (
                          <ModalImage
                            small={img}
                            medium={img}
                            large={img}
                            showRotate={true}
                            imageBackgroundColor={"rgba(255, 0, 0, 0)"}
                            className="postcard-content-img"
                            alt="Hello World!"
                          />
                        )}
                      </div>
                    );
                  })}

                <hr />
                <div className="card-action-buttons">
                  <div>
                    <i
                      className={`${
                        isPostLiked(likes, user) ? "fa solid" : "fa-regular"
                      } fa-heart`}
                      onClick={() => {
                        if (!token) {
                          toast.error("Please Login to Continue");
                        } else {
                          if (!isPostLiked(likes, user)) {
                            postLikeHandler(token, _id, dispatchPost);
                          } else {
                            postDislikeHandler(token, _id, dispatchPost);
                          }
                        }
                      }}
                    ></i>
                    <span style={{ marginLeft: "0.5rem" }}>
                      {likes?.likeCount}
                    </span>
                  </div>

                  <Link to={`/post/${_id}`} className="textdecoration-none">
                    <i className="fa-regular fa-comment"></i>
                    <span style={{ marginLeft: "0.5rem", color: "#ff3b30" }}>
                      {comments?.length}
                    </span>
                  </Link>
                  <i
                    className={`${
                      postState.bookmarks.includes(_id)
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark`}
                    onClick={() => {
                      if (!token) {
                        toast.error("Please Login to Continue");
                      } else {
                        if (postState.bookmarks.includes(_id)) {
                          removeFromBookmarkHandler(token, _id, dispatchPost);
                        } else {
                          addToBookmarkHandler(token, _id, dispatchPost);
                        }
                      }
                    }}
                  ></i>
                  <i
                    className="fas fa-share"
                    onClick={() => {
                      setShowShare((showShare) => ({
                        ...showShare,
                        id: _id,
                        show: true,
                      }));
                    }}
                  ></i>
                </div>
              </div>
            );
          }
        )}
    </>
  );
};
