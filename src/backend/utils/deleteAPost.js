import { deleteAPostService } from "../../services/deleteAPostService";

export const deleteAPost = async (
  postId,
  token,
  dispatchPost,
  setShowModal,
  fromSinglePostPage,
  navigate
) => {
  try {
    const response = await deleteAPostService(postId, token);
    console.log(response);
    if (response?.status === 201) {
      dispatchPost({
        type: "SET_ALL_POSTS",
        payload: response?.data?.posts,
      });
      setShowModal((showDelModal) => ({
        ...showDelModal,
        show: false,
      }));
      fromSinglePostPage && navigate("/feed");
    }
  } catch (error) {
    console.error(error);
  }
};
