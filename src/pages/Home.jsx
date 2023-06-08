import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import "./Home.css";
import homeImg from "../images/home-img.svg";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <img src={homeImg} className="home-image-banner" />
      <div className="home-container-layout">
        <p className="left-text margin">
          <span className="home-container-header">Follow</span>
          <small className="home-container-small-header">
            PEOPLE AROUND THE GLOBE
          </small>
        </p>
        <p className="left-text margin">
          <span className="home-container-header">Connect</span>
          <small className="home-container-small-header">
            WITH YOUR FRIENDS
          </small>
        </p>
        <p className="left-text margin">
          <span className="home-container-header">Share</span>
          <small className="home-container-small-header">
            WHAT YOU THINKING
          </small>
        </p>
        <button
          className="login-primary-btn home-container-btn"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Join Now
        </button>
        <p
          className="home-container-login-link center-text orange-color"
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an account ?
        </p>
      </div>
    </>
  );
};
