import { CreatePost } from "./CreatePost";
export const CreatePostModal = ({ setCreatePost }) => {
  return (
    <div className="show-following-container-layout">
      <div className="modal-content">
        <CreatePost setCreatePost={setCreatePost} />
        <div
          className="modal-cross"
          onClick={() => {
            setCreatePost(() => false);
          }}
        >
          X
        </div>
      </div>
    </div>
  );
};
