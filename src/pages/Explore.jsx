import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Postcard } from "../components/PostCard";

export const Explore = () => {
  const { postState } = useContext(DataContext);
  return (
    <>{postState?.posts?.length > 0 && <Postcard data={postState?.posts} />}</>
  );
};
