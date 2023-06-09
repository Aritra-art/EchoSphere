import axios from "axios";

export const getAllPostsService = async () => {
  try {
    const response = await axios.get("/api/posts");
    return response;
  } catch (error) {}
};
