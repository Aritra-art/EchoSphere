import { createContext, useContext, useEffect, useReducer } from "react";
import { postReducer } from "../reducers/postReducer";
import { getAllPostsService } from "../services/getAllPostsService";
import { getAllBookmarksService } from "../services/getAllBookmarksService";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [postState, dispatchPost] = useReducer(postReducer, {
    posts: [],
    bookmarks: [],
  });
  const { isLoggedIn } = useContext(AuthContext);
  const getAllPosts = async () => {
    const response = await getAllPostsService();
    if (response?.status === 200) {
      dispatchPost({
        type: "SET_ALL_POSTS",
        payload: response?.data?.posts,
      });
    }
  };
  const getAllBookmarks = async () => {
    try {
      const response = await getAllBookmarksService();
      if (response?.status === 200) {
        dispatchPost({
          type: "SET_ALL_BOOKMARKS",
          payload: response?.data?.bookmarks,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  useEffect(() => {
    isLoggedIn && getAllBookmarks();
  }, [isLoggedIn]);

  const value = { postState, dispatchPost };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
