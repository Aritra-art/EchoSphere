import { unFollowUserService } from "../../services/unFollowUserService";

export const unFollowUser = async (encodedToken, userId, dispatchPost) => {
  try {
    const response = await unFollowUserService(encodedToken, userId);
    if (response?.status === 200) {
      dispatchPost({
        type: "UPDATE_USER_UNFOLLOW",
        payload: [response?.data?.followUser, response?.data?.user],
      });
    }
  } catch (error) {
    console.error(error);
  }
};
