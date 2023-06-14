export const postReducer = (postState, { type, payload }) => {
  switch (type) {
    case "SET_ALL_POSTS":
      return { ...postState, posts: payload };
    case "SET_ALL_BOOKMARKS":
      return { ...postState, bookmarks: payload };
    case "SET_ALL_USERS":
      return { ...postState, users: payload };
    case "UPDATE_USER_FOLLOW":
      return {
        ...postState,
        users: postState?.users?.map((user) =>
          user?._id === payload[1]?._id
            ? { ...user, following: [...user?.following, payload[0]] }
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
    default:
      console.log("something went wrong");
  }
};
