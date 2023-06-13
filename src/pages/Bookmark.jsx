import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { Postcard } from "../components/PostCard";
import { getBookmarkArray } from "../backend/utils/getBookmarkArray";

export const Bookmark = () => {
  const { postState } = useContext(DataContext);
  const bookmarkArray =
    postState?.bookmarks?.length > 0 &&
    getBookmarkArray(postState?.posts, postState?.bookmarks);
  return (
    <>{postState?.bookmarks?.length > 0 && <Postcard data={bookmarkArray} />}</>
  );
};
