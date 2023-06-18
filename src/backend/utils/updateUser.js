import { updateUserService } from "../../services/updateUserService";
import { getToken } from "./getToken";

export const updateUser = async (updateUser, dispatchPost) => {
  try {
    const token = getToken();
    const response = await updateUserService(updateUser, dispatchPost, token);
    if (response?.status === 201) {
      dispatchPost({
        type: "UPDATE_USER_PROFILE",
        payload: response?.data?.user,
      });
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
    }
  } catch (error) {
    console.error(error);
  }
};
