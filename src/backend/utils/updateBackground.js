import { toast } from "react-hot-toast";
import { updateUserService } from "../../services/updateUserService";
import { getImages } from "./createPost";
import { getToken } from "./getToken";

export const updateBackground = async (image, dispatchPost) => {
  try {
    typeof image !== "string" &&
      toast.success("We will notify you, once your Cover is Updated");
    const token = getToken();
    const newBgImage =
      typeof image !== "string" ? await getImages([{ image: image }]) : image;
    const updatedUser = {
      background: typeof newBgImage === "string" ? newBgImage : newBgImage[0],
    };
    const response = await updateUserService(updatedUser, dispatchPost, token);
    if (response?.status === 201) {
      dispatchPost({
        type: "UPDATE_COVER_IMAGE",
        payload: response?.data?.user,
      });
      toast.success("Cover Updated Successfully");
    }
  } catch (error) {}
};
