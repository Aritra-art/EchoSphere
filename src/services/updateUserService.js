import axios from "axios";

export const updateUserService = async (
  userData,
  dispatchPost,
  encodedToken
) => {
  try {
    const response = await axios.post(
      `/api/users/edit`,
      { userData },
      { headers: { authorization: encodedToken } }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
