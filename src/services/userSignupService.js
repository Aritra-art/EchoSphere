import axios from "axios";

export const userSignupService = async (signupData) => {
  try {
    const { username, password, firstName, lastName } = signupData;
    const response = await axios.post("/api/auth/signup", {
      username,
      password,
      firstName,
      lastName,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
