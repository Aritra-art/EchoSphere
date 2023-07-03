import axios from "axios";

export const getPostCommentsService = async (postId) => {
  try {
    const response = await axios.get(`/api/comments/${postId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
