import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Login from "../routes/Login";

const Auth = () => {
  return (
    <div className="container">
      <div id="login">
        <div className="login-container">
          <h1>Log in to your Spotify</h1>
          <br></br>
          <Button
            variant="contained"
            color="error"
            className="login-button"
            href="http://localhost:5001/spotify/login"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
