import React from "react";
import Button from "@mui/material/Button";

const Auth = ({ handleLogin }) => {
  return (
    <div className="body-container">
      <div id="login">
        <div className="login-container">
          <h1>Log in to your Spotify</h1>
          <br />
          <Button
            variant="contained"
            color="error"
            className="login-button"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
