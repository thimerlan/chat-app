import { useEffect, useState } from "react";

// import { Auth } from "firebase/auth";
import "./App.scss";
import Navbar from "./Components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Chat from "./Components/Chat";
import { PulseLoader } from "react-spinners";
import SignIn from "./Components/SignIn";
function App() {
  const [user] = useAuthState(auth);
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 200);
  }, []);

  return (
    <div className="appContent">
      <Navbar />
      {spin ? (
        <div className="spinner">
          <PulseLoader
            color="#36d689"
            margin={5}
            size={21}
            speedMultiplier={0.7}
          />
        </div>
      ) : (
        ""
      )}

      {user ? (
        <Chat />
      ) : (
        <>
          <h2 className="uNull">Please join Google to communicate!</h2>
          <div className="sg">
            <SignIn />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
