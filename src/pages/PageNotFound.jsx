import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <img
        src="https://www.pngitem.com/pimgs/m/255-2550411_404-error-images-free-png-transparent-png.png"
        alt="page-not-found"
        style={{
          marginTop: "2rem",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
        }}
      />
      <div
        onClick={() => navigate("/")}
        style={{ textAlign: "center" }}
        className="update-btn"
      >
        Back To Home
      </div>
    </>
  );
};
