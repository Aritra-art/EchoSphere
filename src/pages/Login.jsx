import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export const Login = () => {
  const [loginValue, setLoginValue] = useState({
    username: "",
    password: "",
    err: "",
    checked: false,
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

  const loginFormHandler = (e) => {
    e.preventDefault();
    if (e.target.textContent === "Login as Guest") {
      setLoginValue((loginValue) => ({
        ...loginValue,
        err: "",
      }));
      loginUser({
        username: "aritrachowdhury",
        password: "aritrachowdhury123",
      });
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
      } else if (!loginValue.checked) {
        setLoginValue((loginValue) => ({
          ...loginValue,
          err: "please accept all Terms & Conditions",
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
    <div className="login-layout-container">
      <Header />
      <section>
        <div className="login-layout">
          <h1 className="center-text login-header">Login</h1>
          <form className="login-form-container">
            <label className="flex-col">
              Username{" "}
              <input
                className="login-input"
                type="text"
                placeholder="aritrachowdhury@gmail.com"
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
              I accept all Terms & Conditions
            </label>
            <span className="login-error-msg">{loginValue.err}</span>

            <button onClick={loginFormHandler} className="login-primary-btn">
              Login
            </button>
            <button onClick={loginFormHandler} className="login-secondary-btn">
              Login as Guest
            </button>
            <span onClick={() => navigate("/signup")} className="login-link">
              Create New Account
            </span>
          </form>
        </div>
      </section>
    </div>
  );
};
