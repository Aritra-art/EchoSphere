import { toast } from "react-hot-toast";
import { updateUserService } from "../../services/updateUserService";
import { getImages } from "./createPost";
import { getToken } from "./getToken";

export const updateUser = async (updateUser, dispatchPost, setEditProfile) => {
  try {
    setEditProfile((editProfile) => ({ ...editProfile, show: false }));
    typeof updateUser?.profileAvatar !== "string" &&
      toast.success("We will notify you, once your profile is Updated");
    const token = getToken();
    let { profileAvatar } = updateUser;
    profileAvatar =
      typeof profileAvatar !== "string"
        ? await getImages([{ image: profileAvatar }])
        : profileAvatar;
    const updatedUser = {
      ...updateUser,
      profileAvatar:
        typeof profileAvatar === "string" ? profileAvatar : profileAvatar[0],
    };

    const response = await updateUserService(updatedUser, dispatchPost, token);

    if (response?.status === 201) {
      dispatchPost({
        type: "UPDATE_USER_PROFILE",
        payload: response?.data?.user,
      });

      toast.success("Profile Updated Successfully");
    }
  } catch (error) {
    console.error(error);
  }
};
