import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <h1>Profile</h1>
      <button onClick = {logout}> Logout</button>
    </>
  );
};

export default Profile;
