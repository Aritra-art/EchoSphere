import axios from "axios";

export const postLikeHandler = async (encodedToken, postId, dispatchPost) => {
  try {
    const response = await axios.post(
      `/api/posts/like/${postId}`,
      {},
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
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
