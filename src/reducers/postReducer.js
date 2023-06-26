import { avatarDb } from "../backend/utils/avatarDb";

export const postReducer = (postState, { type, payload }) => {
  switch (type) {
    case "SET_ALL_POSTS":
      return { ...postState, posts: payload };
    case "SET_ALL_BOOKMARKS":
      return { ...postState, bookmarks: payload };
    case "SET_SORT_BY":
      return { ...postState, sortBy: payload };
    case "SET_ALL_USERS":
      return {
        ...postState,
        users: payload.map((user) =>
          user?.profileAvatar
            ? user
            : {
                ...user,
                profileAvatar:
                  avatarDb[Math.floor(Math.random() * avatarDb?.length)],
              }
        ),
      };
    case "UPDATE_USER_PROFILE":
      return {
        ...postState,
        users: postState?.users?.map((user) =>
          user._id === payload._id ? { ...payload } : user
        ),
      };
    case "UPDATE_USER_FOLLOW":
      return {
        ...postState,
        users: postState?.users?.map((user) =>
          user?._id === payload[1]?._id
            ? { ...user, following: [...user?.following, payload[0]] }
            : user
        ),
      };
    case "UPDATE_USER_FOLLOWERS":
      return {
        ...postState,
        users: postState?.users?.map((user) =>
          user?._id === payload[0]?._id
            ? { ...user, followers: [...user?.followers, payload[1]] }
            : user
        ),
      };
    case "UPDATE_USER_UNFOLLOW":
      return {
        ...postState,
        users: postState?.users?.map((user) =>
          user?._id === payload[1]?._id
            ? {
                ...user,
                following: user?.following?.filter(
                  ({ _id }) => _id !== payload[0]?._id
                ),
              }
            : user
        ),
      };
    case "UPDATE_USER_UNFOLLOWERS":
      return {
        ...postState,
        users: postState?.users?.map((user) =>
          user._id === payload[0]._id
            ? {
                ...user,
                followers: user?.followers?.filter(
                  ({ _id }) => _id !== payload[1]._id
                ),
              }
            : user
        ),
      };
    case "SET_LOADING_TRUE":
      return { ...postState, loading: payload };
    case "SET_LOADING_FALSE":
      return { ...postState, loading: payload };
    default:
      console.log("something went wrong");
  }
};
