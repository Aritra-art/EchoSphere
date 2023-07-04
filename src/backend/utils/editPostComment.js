import { editPostCommentService } from "../../services/editPostCommentService";

export const editPostComment = async (
  postId,
  commentId,
  commentData,
  dispatchPost
) => {
  try {
    const response = await editPostCommentService(postId, commentId, {
      comment: commentData,
    });
    if (response?.status === 201) {
      dispatchPost({ type: "SET_ALL_POSTS", payload: response?.data?.posts });
    }
  } catch (error) {
    console.error(error);
  }
};
