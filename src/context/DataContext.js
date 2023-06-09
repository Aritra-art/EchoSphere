import { createContext, useEffect, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { getAllPostsService } from "../services/getAllPostsService";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [postState, dispatchPost] = useReducer(postReducer, {
    posts: [],
  });
  const getAllPosts = async () => {
    const response = await getAllPostsService();
    if (response?.status === 200) {
      dispatchPost({
        type: "SET_ALL_POSTS",
        payload: response?.data?.posts,
      });
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  const value = { postState };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
