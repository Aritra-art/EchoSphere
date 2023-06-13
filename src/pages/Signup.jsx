import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Header } from "../components/Header";

export const Signup = () => {
  const [signupValue, setSignupValue] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    err: "",
    checked: false,
  });
  const { signupUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupValue((signupValue) => ({ ...signupValue, [name]: value }));
  };

  const signupFormHandler = (e) => {
    e.preventDefault();
    if (signupValue.password.length < 6) {
      setSignupValue((signupValue) => ({
        ...signupValue,
        err: "password should be 6 characters long",
      }));
    } else if (signupValue.password !== signupValue.confirmpassword) {
      setSignupValue((signupValue) => ({
        ...signupValue,
        err: "password should match confirm password",
      }));
    } else if (!signupValue.checked) {
      setSignupValue((signupValue) => ({
        ...signupValue,
        err: "please accept all Terms & Conditions",
      }));
    } else {
      setSignupValue((signupValue) => ({
        ...signupValue,
        err: "",
      }));
      signupUser(signupValue);
    }
  };
  return (
    <div>
      <Header />
      <section>
        <div className="login-layout">
          <h1 className="center-text login-header">Signup</h1>
          <form className="login-form-container" onSubmit={signupFormHandler}>
            <label className="flex-col">
              Full Name{" "}
              <input
                type="text"
                placeholder="Aritra Chowdhury"
                required
                className="login-input"
                name="fullname"
                value={signupValue.fullname}
                onChange={handleSignupInputChange}
              />
            </label>
            <label className="flex-col">
              Username{" "}
              <input
                type="text"
                placeholder="aritrachowdhury"
                required
                className="login-input"
                name="username"
                value={signupValue.username}
                onChange={handleSignupInputChange}
              />
            </label>
            <label className="flex-col">
              Email Address{" "}
              <input
                type="email"
                placeholder="aritrachowdhury@gmail.com"
                required
                className="login-input"
                name="email"
                value={signupValue.email}
                onChange={handleSignupInputChange}
              />
            </label>
            <label className="flex-col">
              Password{" "}
              <input
                type="password"
                placeholder="******"
                required
                className="login-input"
                name="password"
                value={signupValue.password}
                onChange={handleSignupInputChange}
              />
            </label>
            <label className="flex-col">
              Confirm Password{" "}
              <input
                type="password"
                placeholder="******"
                required
                className="login-input"
                name="confirmpassword"
                value={signupValue.confirmpassword}
                onChange={handleSignupInputChange}
              />
            </label>
            <label className="login-terms-condition">
              <input
                type="checkbox"
                checked={signupValue.checked}
                onChange={() =>
                  setSignupValue((signupValue) => ({
                    ...signupValue,
                    checked: !signupValue.checked,
                  }))
                }
              />{" "}
              I accept all Terms & Conditions
            </label>
            <span className="login-error-msg">{signupValue.err}</span>
            <button type="submit" className="login-primary-btn">
              Create New Account
            </button>
            <span onClick={() => navigate("/login")} className="login-link">
              Already have an account
            </span>
          </form>
        </div>
      </section>
    </div>
  );
};
