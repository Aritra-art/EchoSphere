import { createPostService } from "../../services/createPostService";
import { getUser } from "./getUser";
import { uploadImage } from "./uploadImage";

export const getImages = async (userImage) => {
  console.log(userImage);
  try {
    let postImage = [];
    for (let image of userImage) {
      const response = await uploadImage(image.image);
      postImage = [...postImage, response?.url];
    }
    return postImage;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async (
  userInput,
  userImage,
  dispatchPost,
  setCreatePost
) => {
  try {
    alert("we will notify you, once your post is uploaded");
    const user = getUser();
    const postImage = userImage.length > 0 ? await getImages(userImage) : [];
    const response = await createPostService({
      content: userInput,
      fullName: `${user?.firstName} ${user?.lastName}`,
      postImage: postImage,
      createdAt: new Date(),
    });
    if (response?.status === 201) {
      dispatchPost({
        type: "SET_ALL_POSTS",
        payload: response?.data?.posts,
      });
      setCreatePost(() => false);
      alert("post uploaded successfully");
    }
  } catch (error) {
    console.error(error);
  }
};
