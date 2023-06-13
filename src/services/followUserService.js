import axios from "axios";

export const followUserService = async (userId, encodedToken) => {
  try {
    const response = await axios.post(
      `/api/users/follow/${userId}`,
      {},
      {
        headers: { authorization: encodedToken },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
