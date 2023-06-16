import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { getToken } from "../backend/utils/getToken";
import { deleteAPost } from "../backend/utils/deleteAPost";

export const DelModal = ({ setShowModal, postId }) => {
  const { postState, dispatchPost } = useContext(DataContext);
  const token = getToken();
  return (
    <div className="show-following-container-layout">
      <div className="modal-content">
        <div>
          <p style={{ color: "#ff3b30", fontWeight: "bold" }}>
            Do you want to delete this post ?
          </p>
          <div>
            <button
              style={{
                margin: "1rem 0",
                fontWeight: "bold",
              }}
              onClick={(e) => {
                deleteAPost(postId, token, dispatchPost);
                e.target.innerText = "Deleting . . .";
                if (!postState?.posts?.find(({ _id }) => _id === postId)) {
                  setShowModal((showDelModal) => ({
                    ...showDelModal,
                    show: false,
                  }));
                }
              }}
            >
              Yes
            </button>
          </div>
        </div>

        <button
          className="modal-cross"
          onClick={() => {
            setShowModal((showDelModal) => ({ ...showDelModal, show: false }));
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};
