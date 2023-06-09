import { Navbar } from "../components/Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="layout-section">
        <div></div>
        <div>{children}</div>
        <div></div>
      </div>
    </>
  );
};
