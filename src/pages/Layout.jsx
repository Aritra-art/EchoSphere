import "./Layout.css";

import { Navbar } from "../components/Navbar";
import { SuggestedUsers } from "../components/SuggestedUsers";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="layout-section">
        <div style={{ flexBasis: "25%" }}>Route Layout</div>
        <div style={{ border: "1px solid", flexBasis: "50%" }}>{children}</div>
        <div style={{ flexBasis: "25%" }}>
          <SuggestedUsers />
        </div>
      </div>
    </>
  );
};
