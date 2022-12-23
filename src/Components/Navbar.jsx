import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import LogOut from "./LogOut";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <header>
      <div className="title">
        <h1>Chat App</h1>
      </div>
      {user ? <LogOut /> : <SignIn />}
    </header>
  );
};

export default Navbar;
