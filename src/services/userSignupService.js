import axios from "axios";

export const userSignupService = async (signupData) => {
  try {
    const { username, password } = signupData;
    const response = await axios.post("/api/auth/signup", {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
