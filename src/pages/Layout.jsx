import "./Layout.css";

import { Navbar } from "../components/Navbar";
import { SuggestedUsers } from "../components/SuggestedUsers";
import { RouteLayout } from "../components/RouteLayout";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="layout-section">
        <div style={{ flexBasis: "25%" }}>
          <RouteLayout />
        </div>
        <div
          style={{
            border: "1px solid",
            flexBasis: "50%",
            flexGrow: 1,
            height: "100vh",
            overflow: "scroll",
          }}
        >
          {children}
        </div>
        <div style={{ flexBasis: "25%" }}>
          <SuggestedUsers />
        </div>
      </div>
    </>
  );
};
