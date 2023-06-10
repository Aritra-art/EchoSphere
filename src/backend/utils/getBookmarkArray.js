export const getBookmarkArray = (posts, bookmarks) => {
  let bookmarkArr = [];
  for (let bookmarkId of bookmarks) {
    bookmarkArr = [
      ...bookmarkArr,
      posts?.find(({ _id }) => _id === bookmarkId),
    ];
  }
  return bookmarkArr;
};
