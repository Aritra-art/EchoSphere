import axios from "axios";
import { getToken } from "../backend/utils/getToken";

export const editPostCommentService = async (
  postId,
  commentId,
  commentData
) => {
  try {
    const encodedToken = getToken();
    const response = await axios.post(
      `/api/comments/edit/${postId}/${commentId}`,
      { commentData },
      { headers: { authorization: encodedToken } }
    );
    return response;
  } catch (error) {}
};
