import { getUser } from "./getUser";

export const isUserFollowed = (users, userId) => {
  const user = getUser();
  const loggedInUser = users?.find(({ _id }) => _id === user?._id);
  console.log(loggedInUser);

  return loggedInUser?.following?.find(({ _id }) => _id === userId)
    ? true
    : false;
};
