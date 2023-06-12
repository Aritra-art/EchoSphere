import axios from "axios";

export const getAllUsersService = async () => {
  try {
    const response = await axios.get("/api/users");
    return response;
  } catch (error) {
    console.error(error);
  }
};
