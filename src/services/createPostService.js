import axios from "axios";
import { getToken } from "../backend/utils/getToken";

export const createPostService = async (post) => {
  try {
    const encodedToken = getToken();
    const response = await axios.post(
      "/api/posts",
      { postData: post },
      { headers: { authorization: encodedToken } }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
