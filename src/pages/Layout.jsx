import { Navbar } from "../components/Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="layout-section">
        <div>leftpane</div>
        <div>{children}</div>
        <div>rightpane</div>
      </div>
    </>
  );
};
