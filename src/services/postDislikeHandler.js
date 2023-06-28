import axios from "axios";
import { toast } from "react-hot-toast";

export const postDislikeHandler = async (
  encodedToken,
  postId,
  dispatchPost
) => {
  try {
    const response = await axios.post(
      `/api/posts/dislike/${postId}`,
      {},
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    if (response?.status === 201) {
      dispatchPost({
        type: "SET_ALL_POSTS",
        payload: response?.data?.posts,
      });
      toast.success("Disliked");
    }
  } catch (error) {
    console.error(error);
  }
};
