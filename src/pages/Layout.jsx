import "./Layout.css";

import { Navbar } from "../components/Navbar";
import { SuggestedUsers } from "../components/SuggestedUsers";
import { RouteLayout } from "../components/RouteLayout";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="layout-section">
        <div
          style={{
            flexBasis: "23%",
            border: "1px solid rgba(0, 0, 0, 0.15)",
          }}
        >
          <RouteLayout />
        </div>
        <div
          style={{
            flexBasis: "50%",
            // flexGrow: 1,
            height: "100vh",
            overflow: "scroll",
          }}
        >
          {children}
        </div>
        <div
          style={{
            flexBasis: "27%",
            flexShrink: "1",
            border: "1px solid rgba(0, 0, 0, 0.15)",
          }}
        >
          <SuggestedUsers />
        </div>
      </div>
    </>
  );
};
