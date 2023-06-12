export const postReducer = (postState, { type, payload }) => {
  switch (type) {
    case "SET_ALL_POSTS":
      return { ...postState, posts: payload };
    case "SET_ALL_BOOKMARKS":
      return { ...postState, bookmarks: payload };
    case "SET_ALL_USERS":
      return { ...postState, users: payload };
    default:
      console.log("something went wrong");
  }
};
