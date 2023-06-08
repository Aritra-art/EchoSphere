import { createContext, useEffect, useReducer, useState } from "react";
import { userLoginService } from "../services/userLoginService";
import { userSignupService } from "../services/userSignupService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const { username } = user ?? { username: "" };
  const loginUser = async (loginData) => {
    try {
      const response = await userLoginService(loginData);
      if (response?.status === 200) {
        localStorage.setItem("token", response?.data?.encodedToken);
        localStorage.setItem("user", JSON.stringify(response?.data?.foundUser));
        alert("Login successfull");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signupUser = async (signupData) => {
    try {
      const response = await userSignupService(signupData);
      if (response?.status === 201) {
        localStorage.setItem("token", response?.data?.encodedToken);
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.createdUser)
        );
        alert("signup successfull");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (username !== "aritrachowdhury") {
      setIsLoggedIn(false);
    }
  }, []);

  const value = { loginUser, signupUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
