import axios from "axios";

export const deleteAPostService = async (postId, encodedToken) => {
  try {
    const response = await axios.delete(`/api/posts/${postId}`, {
      headers: { authorization: encodedToken },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
