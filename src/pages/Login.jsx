import { useContext, useEffect, useState } from "react";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ShowFollowing } from "../components/ShowFollowing";
import { DataContext } from "../context/DataContext";
export const Login = () => {
  const { postState } = useContext(DataContext);
  const [loginValue, setLoginValue] = useState({
    username: "",
    password: "",
    err: "",
    checked: false,
  });
  const [guestUser, setGuestUser] = useState({
    username: "",
    password: "",
  });
  const selectedUser = (user) => {
    setGuestUser((guestUser) => ({
      ...guestUser,
      username: user,
      password: postState?.users?.find((u) => u?.username === user)?.password,
    }));
  };

  const [showModal, setShowModal] = useState({
    type: "",
    show: false,
  });
  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValue((loginValue) => ({
      ...loginValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    guestUser?.username.length > 0 &&
      guestUser?.password?.length > 0 &&
      loginUser({
        username: guestUser?.username,
        password: guestUser?.password,
      });
  }, [guestUser]);

  const loginFormHandler = (e) => {
    e.preventDefault();
    if (e.target.textContent === "Login as Guest") {
      setShowModal((showModal) => ({
        ...showModal,
        type: "Select a User",
        show: true,
      }));
      setLoginValue((loginValue) => ({
        ...loginValue,
        err: "",
      }));
    } else {
      if (
        loginValue.username.length === 0 ||
        loginValue.password.length === 0
      ) {
        setLoginValue((loginValue) => ({
          ...loginValue,
          err: "please enter both the values",
        }));
      } else if (loginValue.password.length < 6) {
        setLoginValue((loginValue) => ({
          ...loginValue,
          err: "password should be 6 characters long",
        }));
      } else {
        setLoginValue((loginValue) => ({
          ...loginValue,
          err: "",
        }));
        loginUser({
          username: loginValue.username,
          password: loginValue.password,
        });
      }
    }
  };

  return (
    <>
      {showModal.show && (
        <ShowFollowing
          arr={postState?.users}
          setShowModal={setShowModal}
          showModal={showModal}
          fromLoginPage
          selectedUser={selectedUser}
        />
      )}
      <div className="login-layout-container">
        <Header />
        <div style={{ margin: " 2rem auto", width: "8rem" }}>
          <NavLink to="/explore" className="nav-pill">
            <i className="fa-solid fa-compass"></i>
            <span style={{ marginLeft: "10px" }}>Explore</span>
          </NavLink>
        </div>
        <section>
          <div className="login-layout">
            <h1 className="center-text login-header">Login</h1>
            <form className="login-form-container">
              <label className="flex-col">
                Username{" "}
                <input
                  className="login-input"
                  type="text"
                  placeholder="aritrachowdhury"
                  name="username"
                  value={loginValue.username}
                  onChange={handleLoginInputChange}
                />
              </label>
              <label className="flex-col">
                Password{" "}
                <input
                  className="login-input"
                  type="password"
                  placeholder="******"
                  name="password"
                  value={loginValue.password}
                  onChange={handleLoginInputChange}
                />
              </label>
              <label className="login-terms-condition">
                <input
                  type="checkbox"
                  checked={loginValue.checked}
                  onChange={() =>
                    setLoginValue((loginValue) => ({
                      ...loginValue,
                      checked: !loginValue.checked,
                    }))
                  }
                />{" "}
                Remember Me
              </label>
              <span className="login-error-msg">{loginValue.err}</span>

              <button onClick={loginFormHandler} className="login-primary-btn">
                Login
              </button>
              <button
                onClick={loginFormHandler}
                className="login-secondary-btn"
              >
                Login as Guest
              </button>
              <span onClick={() => navigate("/signup")} className="login-link">
                Create New Account
              </span>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
