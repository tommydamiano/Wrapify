import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SpotifyApiContext } from "react-spotify-api";
import Cookies from "js-cookie";
import Fade from "react-reveal/Fade";
import FadeIn from "react-fade-in";
import "react-spotify-auth/dist/index.css";
import "../components_styles/Select.css";
import brush from "../img/brush.png";
import note from "../img/note.png";
import gitHub from "../img/github.png";
import defaultProfilePic from "../img/default.jpg";

function Select() {
  const token = Cookies.get("spotifyAuthToken");
  const [blur, setBlur] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const logOut = () => {
    Cookies.set("spotifyAuthToken", "");
  };

  const createBlur = (blur) => {
    if (blur === true) {
      setBlur("-blur-on");
    } else {
      setBlur("");
    }
  };

  useEffect(() => {
    const getProfileInfo = async () => {
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const profileInfo = await response.json();
      console.log(profileInfo);
      setName(profileInfo["display_name"]);
      if (profileInfo["images"][0]) {
        setProfilePic(profileInfo["images"][0]["url"]);
      } else {
        setProfilePic(defaultProfilePic);
      }
    };
    getProfileInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-select-div">
      <div className="logout-button-container">
        <Link to="/">
          <button onClick={() => logOut()}>Log out</button>
        </Link>
      </div>
      <div className="welcome-div">
        <FadeIn delay={150} transitionDuration={700}>
          <h1>Welcome, {name}!</h1>
        </FadeIn>
        <Fade right big>
          <img src={profilePic} alt="pro-pic"></img>
        </Fade>
      </div>
      <SpotifyApiContext.Provider value={token}>
        <div className="choice-container">
          <Link to="/songs" className={`choice-song${blur}`}>
            <div>Top Songs</div>
            <img src={note} alt="note"></img>
          </Link>
          <Link
            to="/artists"
            className="choice-artist"
            onMouseEnter={() => createBlur(true)}
            onMouseLeave={() => createBlur(false)}
          >
            <div>Top Artists</div>
            <img src={brush} alt="brush"></img>
          </Link>
        </div>
      </SpotifyApiContext.Provider>
      <div className="footer-select">
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/tommydamiano"
          >
            Binked by Tommy Damiano
          </a>
        </p>
        <img src={gitHub} alt="github"></img>
      </div>
    </div>
  );
}

export default Select;
