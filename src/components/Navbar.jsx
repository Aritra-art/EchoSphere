import { NavLink, useNavigate } from "react-router-dom";

import "./Navbar.css";
import { getToken } from "../backend/utils/getToken";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const token = getToken();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  return (
    <div className="navbar-layout-container">
      <p className="navbar-logo-header">
        <span className="orange-color">Echo</span>Sphere
      </p>
      <NavLink to="/feed">Feed</NavLink>
      <NavLink to="/explore">Explore</NavLink>
      <NavLink to="/bookmark">Bookmark</NavLink>
      {token?.length > 0 && (
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            navigate("/login");
          }}
        >
          Logout
        </button>
      )}
      <input placeholder="Search People" />
    </div>
  );
};
