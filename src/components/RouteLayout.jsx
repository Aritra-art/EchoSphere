import { NavLink, useNavigate } from "react-router-dom";
import "./RouteLayout.css";
import { getToken } from "../backend/utils/getToken";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUser } from "../backend/utils/getUser";

export const RouteLayout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const token = getToken();
  const user = getUser();
  return (
    <div className="outer-route-layout-container">
      <div className="route-layout-container ">
        <NavLink className="nav-pill" to="/feed">
          <i className="fa-solid fa-house"></i>
          <span style={{ marginLeft: "10px" }}>Feed</span>
        </NavLink>
        <NavLink className="nav-pill" to="/explore">
          <i className="fa-solid fa-compass"></i>
          <span style={{ marginLeft: "10px" }}>Explore</span>
        </NavLink>
        <NavLink className="nav-pill" to="/bookmark">
          <i className="fa-solid fa-bookmark"></i>
          <span style={{ marginLeft: "10px" }}>Bookmark</span>
        </NavLink>
        {token && (
          <NavLink
            className="nav-pill"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              navigate("/login");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>{" "}
            <span style={{ marginLeft: "10px" }}>Logout</span>
          </NavLink>
        )}
      </div>
      {token && (
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
          onClick={() => {
            navigate(`/profile/${user?.username}`);
          }}
        >
          <img
            className="user-avatar-img"
            alt="profile-avatar"
            src={user?.profileAvatar}
          />
          <div className="flex-col">
            <span>
              {user?.firstName} {user?.lastName}
            </span>
            <small>@{user?.username}</small>
          </div>
        </div>
      )}
    </div>
  );
};
