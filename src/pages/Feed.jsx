import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { getUserFeed } from "../backend/utils/getUserFeed";
import { Postcard } from "../components/PostCard";
import { PostCardShimmer } from "../components/PostCardShimmer";

export const Feed = () => {
  const { postState } = useContext(DataContext);
  const userFeed = getUserFeed(postState);

  return (
    <>
      {userFeed?.length === 0 && <PostCardShimmer />}
      {userFeed?.length > 0 && <Postcard data={userFeed} />}
    </>
  );
};
