import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

export const BackgroundModal = ({ setShowBackgroundModal, img }) => {
  const { postState } = useContext(DataContext);
  const bannerArr = postState?.users?.map(({ background }) => background);

  const [previewImage, setPreviewImage] = useState({ image: img, bg: "black" });
  return (
    <>
      <div className="show-following-container-layout">
        <div className="modal-content">
          <div>
            <span>Set Cover Photo</span>
            <div className="modal-inner-content">
              <img
                src={previewImage?.image}
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
                    border: `2px solid ${
                      img === previewImage?.image ? previewImage.bg : "black"
                    }`,
                  }}
                />
              ))}
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
