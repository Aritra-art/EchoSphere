import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { updateBackground } from "../backend/utils/updateBackground";

export const BackgroundModal = ({ setShowBackgroundModal, img, userId }) => {
  const { postState, dispatchPost } = useContext(DataContext);
  const bannerArr = [
    "https://res.cloudinary.com/dazdakg1z/image/upload/v1684863377/samples/people/kitchen-bar.jpg",
    "https://res.cloudinary.com/dazdakg1z/image/upload/v1684863389/samples/landscapes/nature-mountains.jpg",
    "https://res.cloudinary.com/dazdakg1z/image/upload/v1684863378/samples/animals/reindeer.jpg",
    "https://res.cloudinary.com/dazdakg1z/image/upload/v1684863379/samples/food/pot-mussels.jpg",
    "https://res.cloudinary.com/dazdakg1z/image/upload/v1684863383/samples/animals/three-dogs.jpg",
  ];

  const [previewImage, setPreviewImage] = useState({ image: img, bg: "black" });
  return (
    <>
      <div className="show-following-container-layout">
        <div className="modal-content">
          <div>
            <span>Set Cover Photo</span>
            <div className="modal-inner-content">
              <img
                src={
                  typeof previewImage?.image === "string"
                    ? previewImage?.image
                    : URL.createObjectURL(previewImage.image)
                }
                alt="banner-preview"
                style={{ width: "100%", height: "40%", borderRadius: "0.5rem" }}
              />
              <span
                style={{
                  display: "inline-block",
                  margin: "0.2rem 0",
                  fontSize: "1.2rem",
                  color: "#ff3b30",
                  fontWeight: "bold",
                }}
              >
                Suggested Cover Photos
              </span>
            </div>
            {bannerArr
              .filter((image) => image !== img)
              .map((img) => (
                <img
                  onClick={() => {
                    setPreviewImage(() => ({ image: img, bg: "#ff3b30" }));
                  }}
                  key={img}
                  alt="banner"
                  src={img}
                  style={{
                    width: "48%",
                    height: "20%",
                    margin: "0.2rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    border: `2px solid ${
                      img === previewImage?.image ? previewImage.bg : "black"
                    }`,
                  }}
                />
              ))}
            <div>
              <label>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    border: "2px solid #ff3b30",
                    borderRadius: "0.3rem",
                    color: "#ff3b30",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    padding: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  Browse From Local
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="create-post-image-input"
                  onChange={(e) => {
                    setPreviewImage(() => ({
                      image: e.target.files[0],
                      bg: "#ff3b30",
                    }));
                  }}
                />
              </label>
            </div>
            <div
              onClick={() => {
                updateBackground(previewImage.image, dispatchPost);
                setShowBackgroundModal(() => false);
              }}
            >
              <button className="update-btn" style={{ width: "100%" }}>
                Update Cover
              </button>
            </div>
          </div>

          <div
            className="modal-cross"
            onClick={() => {
              setShowBackgroundModal(() => false);
            }}
          >
            X
          </div>
        </div>
      </div>
    </>
  );
};
