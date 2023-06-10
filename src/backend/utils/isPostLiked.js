export const isPostLiked = (likes, user) => {
  return likes?.likedBy?.filter(({ username }) => username === user?.username)
    ?.length !== 0
    ? true
    : false;
};
