import axios from "axios";

export const getSinglePostService = async (postId) => {
  try {
    const response = await axios.get(`/api/posts/${postId}`);
    return response;
  } catch (error) {
    console.error();
  }
};
