import { getUser } from "./getUser";

export const getUserFeed = (postState) => {
  const user = getUser();
  return postState?.posts?.filter(
    ({ username }) => username === user?.username
  );
};
