import { createContext } from "react";
import { userLoginService } from "../services/userLoginService";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const loginUser = async (loginData) => {
    try {
      const response = await userLoginService(loginData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const value = { loginUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
