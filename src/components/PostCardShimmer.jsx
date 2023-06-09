export const PostCardShimmer = () => {
  const dummyImg = {
    width: "100%",
    background: "white",
    padding: "10rem 5rem",
    borderRadius: "0.6rem",
  };

  const dummyAvatar = {
    width: "60px",
    height: "60px",
    background: "white",
    marginBottom: "10px",
  };
  const dummyHeader = {
    width: "15rem",
    background: "white",
    marginBottom: "10px",
    borderRadius: "0.6rem",
  };
  return (
    <>
      <div className="postcard-layout">
        <div className="postcard-header-layout">
          <p className="user-avatar-img" style={dummyAvatar}></p>
          <span style={dummyHeader}></span>
          <p style={dummyImg}></p>
        </div>
      </div>
      <div className="postcard-layout">
        <div className="postcard-header-layout">
          <p className="user-avatar-img" style={dummyAvatar}></p>
          <span style={dummyHeader}></span>
          <p style={dummyImg}></p>
        </div>
      </div>
      <div className="postcard-layout">
        <div className="postcard-header-layout">
          <p className="user-avatar-img" style={dummyAvatar}></p>
          <span style={dummyHeader}></span>
          <p style={dummyImg}></p>
        </div>
      </div>
      <div className="postcard-layout">
        <div className="postcard-header-layout">
          <p className="user-avatar-img" style={dummyAvatar}></p>
          <span style={dummyHeader}></span>
          <p style={dummyImg}></p>
        </div>
      </div>
      <div className="postcard-layout">
        <div className="postcard-header-layout">
          <p className="user-avatar-img" style={dummyAvatar}></p>
          <span style={dummyHeader}></span>
          <p style={dummyImg}></p>
        </div>
      </div>
      <div className="postcard-layout">
        <div className="postcard-header-layout">
          <p className="user-avatar-img" style={dummyAvatar}></p>
          <span style={dummyHeader}></span>
          <p style={dummyImg}></p>
        </div>
      </div>
    </>
  );
};
