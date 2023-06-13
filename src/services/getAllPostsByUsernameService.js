import axios from "axios";

export const getAllPostsByUsernameService = async (username) => {
  try {
    const response = await axios.get(`/api/posts/user/${username}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
