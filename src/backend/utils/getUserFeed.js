import { getUser } from "./getUser";

export const getUserFeed = (postState) => {
  const user = getUser();
  let userFeed = [];
  const loggedInUser = postState?.users?.find(({ _id }) => _id === user?._id);
  const followUserFeed = postState?.posts?.filter(({ username }) => {
    const followUsernameArr = loggedInUser?.following?.map(
      ({ username }) => username
    );
    return followUsernameArr.includes(username);
  });
  userFeed = [
    ...postState?.posts?.filter(
      ({ username }) => username === loggedInUser?.username
    ),
    ...followUserFeed,
  ];
  return userFeed;
};
