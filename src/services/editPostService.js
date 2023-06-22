import axios from "axios";
import { getToken } from "../backend/utils/getToken";

export const editPostService = async (editId, postData) => {
  try {
    const encodedToken = getToken();
    const response = await axios.post(
      `/api/posts/edit/${editId}`,
      { postData },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
