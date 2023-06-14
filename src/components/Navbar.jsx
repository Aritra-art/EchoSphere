import "./Navbar.css";

export const Navbar = ({ from }) => {
  return (
    <div className="navbar-layout-container">
      <span className="navbar-logo-header">{from}</span>
    </div>
  );
};
