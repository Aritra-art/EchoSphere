import axios from "axios";

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
    }
  } catch (error) {
    console.error(error);
  }
};
