import { toast } from "react-hot-toast";
import { editPostService } from "../../services/editPostService";
import { getImages } from "./createPost";

export const editPostUtil = async (editId, editPost, dispatchPost) => {
  try {
    editPost?.userImage?.length > 0 &&
      toast.success("We will notify you, once your post is Updated");
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
    toast.success("Post Updated");
  } catch (error) {
    console.error(error);
  }
};
