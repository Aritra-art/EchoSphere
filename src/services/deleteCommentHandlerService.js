import axios from "axios";
import { getToken } from "../backend/utils/getToken";

export const deleteCommentHandlerService = async (postId, commentId) => {
  try {
    const encodedToken = getToken();
    const response = await axios.post(
      `/api/comments/delete/${postId}/${commentId}`,
      {},
      { headers: { authorization: encodedToken } }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
