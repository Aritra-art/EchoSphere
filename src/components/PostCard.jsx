import "./PostCard.css";

export const Postcard = ({ data }) => {
  return (
    <>
      {data?.length > 0 &&
        data.map(
          ({
            _id,
            content,
            likes,
            fullname,
            username,
            postImage,
            createdAt,
          }) => {
            return (
              <div key={_id} className="postcard-layout">
                <div className="postcard-header-layout">
                  <img
                    className="user-avatar-img"
                    src="https://picsum.photos/id/237/80/80"
                  />
                  <span className="postcard-header-name">
                    {fullname} . {createdAt}
                    <p>@{username}</p>
                  </span>
                </div>
              </div>
            );
          }
        )}
    </>
  );
};
