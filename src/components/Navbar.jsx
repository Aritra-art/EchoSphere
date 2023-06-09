import { Header } from "./Header";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar-layout-container">
      <p className="navbar-logo-header">
        <span className="orange-color">Echo</span>Sphere
      </p>
      <input placeholder="Search People" />
    </div>
  );
};
