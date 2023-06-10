import axios from "axios";
import { getToken } from "../backend/utils/getToken";

export const getAllBookmarksService = async () => {
  const encodedToken = getToken();
  try {
    const response = await axios.get("/api/users/bookmark", {
      headers: {
        authorization: encodedToken,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
