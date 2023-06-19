export const UserCardShimmer = () => {
  const dummyAvatar = {
    width: "70px",
    height: "70px",
    background: "#f7f7f7",
    marginBottom: "10px",
  };
  const dummyHeaderOne = {
    width: "15rem",
    background: "#f7f7f7",
    marginBottom: "10px",
    borderRadius: "0.6rem",
    padding: "0.8rem 0.3rem",
  };
  return (
    <>
      <ul>
        <li className="suggested-user">
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <p className="user-avatar-img" style={dummyAvatar}></p>
            <div className="flex-col">
              <span style={dummyHeaderOne}> </span>
              <span style={dummyHeaderOne}> </span>
            </div>
          </div>
        </li>
        <li className="suggested-user">
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <p className="user-avatar-img" style={dummyAvatar}></p>
            <div className="flex-col">
              <span style={dummyHeaderOne}> </span>
              <span style={dummyHeaderOne}> </span>
            </div>
          </div>
        </li>
        <li className="suggested-user">
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <p className="user-avatar-img" style={dummyAvatar}></p>
            <div className="flex-col">
              <span style={dummyHeaderOne}> </span>
              <span style={dummyHeaderOne}> </span>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};
