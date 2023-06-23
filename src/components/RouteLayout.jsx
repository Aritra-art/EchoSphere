import { NavLink, useNavigate } from "react-router-dom";
import "./RouteLayout.css";
import { getToken } from "../backend/utils/getToken";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUser } from "../backend/utils/getUser";
import { DataContext } from "../context/DataContext";

export const RouteLayout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const { postState } = useContext(DataContext);
  const token = getToken();
  const user = getUser();
  const activeNavpill = ({ isActive }) => ({
    color: isActive && "#ff3b30",
    fontWeight: isActive && "bold",
  });
  return (
    <div className="outer-route-layout-container">
      <div className="route-layout-container ">
        {token && (
          <NavLink className="nav-pill" to="/feed" style={activeNavpill}>
            <i className="fa-solid fa-house"></i>
            <span style={{ marginLeft: "10px" }}>Feed</span>
          </NavLink>
        )}

        <NavLink style={activeNavpill} className="nav-pill" to="/explore">
          <i className="fa-solid fa-compass"></i>
          <span style={{ marginLeft: "10px" }}>Explore</span>
        </NavLink>
        {token && (
          <NavLink style={activeNavpill} className="nav-pill" to="/bookmark">
            <i className="fa-solid fa-bookmark"></i>
            <span style={{ marginLeft: "10px" }}>Bookmark</span>
          </NavLink>
        )}

        {token && (
          <NavLink
            className="nav-pill"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span style={{ marginLeft: "10px" }}>Logout</span>
          </NavLink>
        )}
        {!token && (
          <NavLink to="/login" className="nav-pill">
            <i className="fa-solid fa-right-to-bracket"></i>
            <span style={{ marginLeft: "10px" }}>Login</span>
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
            src={
              postState?.users?.find((u) => u._id === user._id)?.profileAvatar
            }
          />
          <div className="flex-col">
            <span>
              {user &&
                postState?.users?.find((u) => u._id === user._id)
                  ?.firstName}{" "}
              {user &&
                postState?.users?.find((u) => u._id === user._id)?.lastName}
            </span>
            <small>@{user?.username}</small>
          </div>
        </div>
      )}
    </div>
  );
};
