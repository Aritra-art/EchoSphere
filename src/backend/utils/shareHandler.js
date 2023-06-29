export const shareHandler = async (postId) => {
  try {
    await navigator.share({
      title: "EchoSphere",
      text: "Check out this post",
      url: `https://echo-sphere.vercel.app/post/${postId}`,
    });
  } catch (error) {
    console.error("Error sharing:", error);
  }
};
