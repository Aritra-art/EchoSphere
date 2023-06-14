import axios from "axios";

export const unFollowUserService = async (encodedToken, userId) => {
  try {
    const respose = await axios.post(
      `/api/users/unfollow/${userId}`,
      {},
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    return respose;
  } catch (error) {
    console.error(error);
  }
};
