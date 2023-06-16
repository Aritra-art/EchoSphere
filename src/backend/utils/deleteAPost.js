import { deleteAPostService } from "../../services/deleteAPostService";

export const deleteAPost = async (postId, token, dispatchPost) => {
  try {
    const response = await deleteAPostService(postId, token);
    console.log(response);
    if (response?.status === 201) {
      dispatchPost({
        type: "SET_ALL_POSTS",
        payload: response?.data?.posts,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
