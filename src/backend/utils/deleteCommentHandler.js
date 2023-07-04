import { deleteCommentHandlerService } from "../../services/deleteCommentHandlerService";

export const deleteCommentHandler = async (postId, commentId, dispatchPost) => {
  try {
    const response = await deleteCommentHandlerService(postId, commentId);
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
