import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { getUserFeed } from "../backend/utils/getUserFeed";
import { Postcard } from "../components/PostCard";
import { PostCardShimmer } from "../components/PostCardShimmer";
import { Navbar } from "../components/Navbar";

export const Feed = () => {
  const { postState } = useContext(DataContext);
  const userFeed = getUserFeed(postState);

  return (
    <>
      <Navbar from="Home" />
      <div style={{ marginTop: "4rem" }}>
        {/* {userFeed?.length === 0 && <PostCardShimmer />} */}
        {userFeed?.length > 0 && <Postcard data={userFeed} />}
      </div>
    </>
  );
};
