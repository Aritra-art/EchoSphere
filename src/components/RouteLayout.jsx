import { NavLink } from "react-router-dom";
import "./RouteLayout.css";
import { getToken } from "../backend/utils/getToken";

export const RouteLayout = () => {
  const token = getToken();
  return (
    <div className="route-layout-container">
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
        <NavLink className="nav-pill">
          <i className="fa-solid fa-right-from-bracket"></i>{" "}
          <span style={{ marginLeft: "10px" }}>Logout</span>
        </NavLink>
      )}
    </div>
  );
};
