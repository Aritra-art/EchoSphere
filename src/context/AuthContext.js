import { createContext, useEffect, useState } from "react";
import { userLoginService } from "../services/userLoginService";
import { userSignupService } from "../services/userSignupService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const { username } = user ?? { username: "" };
  const loginUser = async (loginData) => {
    try {
      const response = await userLoginService(loginData);
      if (response?.status === 200) {
        localStorage.setItem("token", response?.data?.encodedToken);
        localStorage.setItem("user", JSON.stringify(response?.data?.foundUser));
        setIsLoggedIn(true);
        navigate("/feed");
        toast.success("Login Successfull");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signupUser = async (signupData) => {
    try {
      const response = await userSignupService(signupData);
      if (response?.status === 201) {
        console.log(response?.data?.createdUser);
        localStorage.setItem("token", response?.data?.encodedToken);
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.createdUser)
        );

        setIsLoggedIn(true);
        navigate("/feed");
        toast.success("signup successfull");
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

  const value = { loginUser, signupUser, isLoggedIn, setIsLoggedIn };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
