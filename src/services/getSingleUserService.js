import axios from "axios";

export const getSingleUserService = async (username) => {
  try {
    const response = await axios(`/api/users/${username}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
