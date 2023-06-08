import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Signup = () => {
  const [signupValue, setSignupValue] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    err: "",
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
    } else {
      setSignupValue((signupValue) => ({
        ...signupValue,
        err: "",
      }));
      signupUser(signupValue);
    }
  };
  return (
    <>
      <section className="login-layout-conteiner">
        <div className="login-layout">
          <h1 className="center-text">Signup</h1>
          <form className="login-form-container" onSubmit={signupFormHandler}>
            <label>
              Full Name{" "}
              <input
                placeholder="Aritra Chowdhury"
                required
                name="fullname"
                value={signupValue.fullname}
                onChange={handleSignupInputChange}
              />
            </label>
            <label>
              Username{" "}
              <input
                placeholder="aritrachowdhury"
                required
                name="username"
                value={signupValue.username}
                onChange={handleSignupInputChange}
              />
            </label>
            <label>
              Email Address{" "}
              <input
                placeholder="aritrachowdhury@gmail.com"
                required
                name="email"
                value={signupValue.email}
                onChange={handleSignupInputChange}
              />
            </label>
            <label>
              Password{" "}
              <input
                placeholder="******"
                required
                name="password"
                value={signupValue.password}
                onChange={handleSignupInputChange}
              />
            </label>
            <label>
              Confirm Password{" "}
              <input
                placeholder="******"
                required
                name="confirmpassword"
                value={signupValue.confirmpassword}
                onChange={handleSignupInputChange}
              />
            </label>
            <span className="login-error-msg">{signupValue.err}</span>
            <button type="submit">Create New Account</button>
            <span onClick={() => navigate("/login")}>
              Already have an account
            </span>
          </form>
        </div>
      </section>
    </>
  );
};
