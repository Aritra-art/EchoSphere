import axios from "axios";
import { toast } from "react-hot-toast";

export const removeFromBookmarkHandler = async (
  encodedToken,
  postId,
  dispatchPost
) => {
  try {
    const response = await axios.post(
      `/api/users/remove-bookmark/${postId}`,
      {},
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    if (response?.status === 200) {
      dispatchPost({
        type: "SET_ALL_BOOKMARKS",
        payload: response?.data?.bookmarks,
      });
      toast.success("Removed from Bookmark");
    }
  } catch (error) {
    console.error(error);
  }
};
