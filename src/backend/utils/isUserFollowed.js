import { getUser } from "./getUser";

export const isUserFollowed = (users, userId) => {
  const user = getUser();
  const loggedInUser = users?.find(({ _id }) => _id === user?._id);
  return loggedInUser?.following?.find(({ _id }) => _id === userId)
    ? true
    : false;
};
