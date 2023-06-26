import { createContext, useContext, useEffect, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { getAllPostsService } from "../services/getAllPostsService";
import { getAllBookmarksService } from "../services/getAllBookmarksService";
import { AuthContext } from "./AuthContext";
import { getAllUsersService } from "../services/getAllUsersService";
import { getToken } from "../backend/utils/getToken";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const token = getToken();
  const [postState, dispatchPost] = useReducer(postReducer, {
    posts: [],
    bookmarks: [],
    users: [],
    sortBy: "latest",
    loading: false,
  });
  const { isLoggedIn } = useContext(AuthContext);

  const getAllPosts = async () => {
    dispatchPost({ type: "SET_LOADING_TRUE", payload: true });
    try {
      const response = await getAllPostsService();
      if (response?.status === 200) {
        dispatchPost({
          type: "SET_ALL_POSTS",
          payload: response?.data?.posts,
        });
        dispatchPost({ type: "SET_LOADING_FALSE", payload: false });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getAllUsers = async () => {
    try {
      dispatchPost({ type: "SET_LOADING_TRUE", payload: true });
      const response = await getAllUsersService();
      if (response?.status === 200) {
        dispatchPost({
          type: "SET_ALL_USERS",
          payload: response?.data?.users,
        });
        dispatchPost({ type: "SET_LOADING_FALSE", payload: false });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getAllBookmarks = async () => {
    try {
      dispatchPost({ type: "SET_LOADING_TRUE", payload: true });
      const response = await getAllBookmarksService();
      if (response?.status === 200) {
        dispatchPost({
          type: "SET_ALL_BOOKMARKS",
          payload: response?.data?.bookmarks,
        });
        dispatchPost({ type: "SET_LOADING_FALSE", payload: false });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts();
    getAllUsers();
    isLoggedIn && token && getAllBookmarks();
  }, [isLoggedIn, token]);

  const value = { postState, dispatchPost };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
