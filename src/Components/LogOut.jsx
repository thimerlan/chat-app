import React from "react";
import { auth } from "../firebase";

const LogOut = () => {
  const signOut = () => {
    signOut(auth);
  };
  return (
    <div className="logOut">
      <button onClick={() => auth.signOut()}>Log Out!</button>
    </div>
  );
};

export default LogOut;
