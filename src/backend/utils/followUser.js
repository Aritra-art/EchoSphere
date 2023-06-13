import { followUserService } from "../../services/followUserService";

export const followUser = async (userId, token, dispatchPost) => {
  try {
    const response = await followUserService(userId, token);
    console.log(response);
    if (response?.status === 200) {
      dispatchPost({
        type: "UPDATE_USER_FOLLOW",
        payload: [response?.data?.followUser, response?.data?.user],
      });
    }
  } catch (error) {
    console.error(error);
  }
};
