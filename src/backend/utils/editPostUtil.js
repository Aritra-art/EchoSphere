import { toast } from "react-hot-toast";
import { editPostService } from "../../services/editPostService";
import { getImages } from "./createPost";

export const editPostUtil = async (editId, editPost, dispatchPost) => {
  try {
    const newImages =
      editPost?.userImage?.length > 0
        ? await getImages(editPost?.userImage)
        : [];
    const finalPostImage = [
      ...editPost?.postImage()?.map((img) => img.image),
      ...newImages,
    ];
    const response = await editPostService(editId, {
      content: editPost?.content,
      postImage: finalPostImage,
    });
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
