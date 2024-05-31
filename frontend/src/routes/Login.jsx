import React, { useState } from "react";
import Auth from "../components/Auth";
import Home from "../routes/Home";
import "../styles/Login.css";

const Login = () => {
  // User isn't logged in yet.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If authentication passes, user will be sent to the home page
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    // <div>{isLoggedIn ? <Home /> : <Auth handleLogin={handleLogin} />}</div>
    <Auth />
  );
};

export default Login;
