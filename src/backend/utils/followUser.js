import { toast } from "react-hot-toast";
import { followUserService } from "../../services/followUserService";

export const followUser = async (userId, token, dispatchPost) => {
  try {
    const response = await followUserService(userId, token);
    if (response?.status === 200) {
      dispatchPost({
        type: "UPDATE_USER_FOLLOW",
        payload: [response?.data?.followUser, response?.data?.user],
      });
      dispatchPost({
        type: "UPDATE_USER_FOLLOWERS",
        payload: [response?.data?.followUser, response?.data?.user],
      });
      toast.success("Followed");
    }
  } catch (error) {
    console.error(error);
  }
};
