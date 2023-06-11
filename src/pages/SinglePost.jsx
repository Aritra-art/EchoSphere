import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePostService } from "../services/getSinglePostService";

export const SinglePost = () => {
  const [singlePost, setSinglePost] = useState({});
  const { postId } = useParams();
  const getSinglePost = async () => {
    try {
      const response = await getSinglePostService(postId);
      if (response?.status === 200) {
        setSinglePost(response?.data?.post);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSinglePost();
  }, [postId]);

  return <>{}</>;
};
