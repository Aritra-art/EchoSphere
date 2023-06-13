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
      <p className="navbar-logo-header" onClick={() => navigate("/explore")}>
        <span className="orange-color">Echo</span>Sphere
      </p>
    </div>
  );
};
