import axios from "axios";

export const userLoginService = async (loginData) => {
  try {
    const { username, password } = loginData;
    const response = await axios.post("/api/auth/login", {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
