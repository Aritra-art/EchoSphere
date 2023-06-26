import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Postcard } from "../components/PostCard";
import { getBookmarkArray } from "../backend/utils/getBookmarkArray";
import { Navbar } from "../components/Navbar";
import { PostCardShimmer } from "../components/PostCardShimmer";

export const Bookmark = () => {
  const { postState } = useContext(DataContext);
  const bookmarkArray =
    postState?.bookmarks?.length > 0 &&
    getBookmarkArray(postState?.posts, postState?.bookmarks);
  return (
    <>
      <Navbar from="Bookmark" />

      <div style={{ marginTop: "4rem" }}>
        {postState?.loading && <PostCardShimmer />}
        {postState?.bookmarks?.length === 0 && (
          <h2 style={{ textAlign: "center", color: "#ff3b30" }}>
            No Post added to Bookmarks
          </h2>
        )}
        {postState?.bookmarks?.length > 0 && <Postcard data={bookmarkArray} />}
      </div>
    </>
  );
};
