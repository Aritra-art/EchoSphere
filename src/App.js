import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { Layout } from "./pages/Layout";
import { Feed } from "./pages/Feed";
import { RequireAuth } from "./services/RequireAuth";
import { Bookmark } from "./pages/Bookmark";
import { SinglePost } from "./pages/SinglePost";
import { getToken } from "./backend/utils/getToken";
import { SingleProfile } from "./pages/SingleProfile";

function App() {
  const token = getToken();
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <RequireAuth>
                <Layout>
                  <Feed />
                </Layout>
              </RequireAuth>
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/explore"
          element={
            <Layout>
              <Explore />
            </Layout>
          }
        />
        <Route
          path="/feed"
          element={
            <RequireAuth>
              <Layout>
                <Feed />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/bookmark"
          element={
            <RequireAuth>
              <Layout>
                <Bookmark />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <Layout>
              <SinglePost />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile/:username"
          element={
            <Layout>
              <SingleProfile />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
