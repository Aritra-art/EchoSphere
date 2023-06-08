import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const [loginValue, setLoginValue] = useState({
    username: "",
    password: "",
    err: "",
  });

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
      loginUser({ username: "adarshbalika", password: "adarshBalika123" });
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
      <section className="login-layout-container">
        <div className="login-layout">
          <form className="login-form-container">
            <label>
              Username{" "}
              <input
                type="text"
                placeholder="aritrachowdhury@gmail.com"
                name="username"
                value={loginValue.username}
                onChange={handleLoginInputChange}
              />
            </label>
            <label>
              Password{" "}
              <input
                type="password"
                placeholder="******"
                name="password"
                value={loginValue.password}
                onChange={handleLoginInputChange}
              />
            </label>
            <span className="login-error-msg">{loginValue.err}</span>

            <button onClick={loginFormHandler}>Login</button>
            <button onClick={loginFormHandler}>Login as Guest</button>
            <p>Create New Account</p>
          </form>
        </div>
      </section>
    </>
  );
};
