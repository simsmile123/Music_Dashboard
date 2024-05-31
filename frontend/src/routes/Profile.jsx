import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="main-content">
      <Navbar/>
      <div>
          <h1>Profile</h1>
      <button onClick = {logout}> Logout</button>
      </div>
    
    </div>
  );
};

export default Profile;
