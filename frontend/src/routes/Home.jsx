import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [messages, setMessages] = useState([]);

  /* After redirecting to Home set useContext variables */
  const { login } = useContext(AuthContext);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get("access_token");
    const refresh_token = urlParams.get("refresh_token");
    const id = urlParams.get("id");
    const error = urlParams.get("error");

    if (error) {
      alert("There was an error during the authentication");
    } else {
      if (access_token) {
        login({ access_token, refresh_token, id });
      }
    }
  }, []);
  return (
    <>
      <h1> Home </h1>
      <>
        <div>
          <h1>Welcome</h1>
          <Link to={"/home"}>Home</Link>
          <br></br>
          <Link to={"/profile"}>Profile</Link>
          <br></br>
          <Link to={"/liked-songs"}>Liked Songs</Link>
          <br></br>
          <Link to={"/top-artists"}>Top Artists</Link>
          <br></br>
          <Link to={"/top-songs"}>Top Songs</Link>
          <br></br>
          <Link to={"/explore"}>Explore</Link>
          <br></br>
          <Link to={"/inbox"}>Inbox</Link>
          <br></br>
          <Link to={"/forum"}>Forum</Link>
        </div>
      </>
    </>
  );
};

export default Home;
