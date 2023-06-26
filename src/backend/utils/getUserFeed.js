import { getPostDate } from "./getPostDate";
import { getUser } from "./getUser";

export const getUserFeed = (postState) => {
  const user = getUser();
  let userFeed = [];
  const loggedInUser = postState?.users?.find(({ _id }) => _id === user?._id);
  const followUserFeed = postState?.posts?.filter(({ username }) => {
    const followUsernameArr = loggedInUser?.following?.map(
      ({ username }) => username
    );
    return followUsernameArr?.includes(username);
  });
  userFeed = [
    ...followUserFeed,
    ...postState?.posts?.filter(
      ({ username }) => username === loggedInUser?.username
    ),
  ];
  if (postState?.sortBy === "latest") {
    userFeed = userFeed.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  if (postState?.sortBy === "oldest") {
    userFeed = userFeed.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }
  if (postState?.sortBy === "trending") {
    userFeed = userFeed.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  }
  return userFeed;
};
