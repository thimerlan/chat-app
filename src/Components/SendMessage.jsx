import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../firebase";
import { BiSend } from "react-icons/bi";
import { BsEmojiSunglassesFill } from "react-icons/bs";

// BsEmojiSunglassesFill
import "./SomeStyles.scss";
import axios from "axios";
const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState("");
  const [emoji, setEmoji] = useState([]);
  const [vEmoji, setVEmoji] = useState(false);
  useEffect(() => {
    async function GetEmoji() {
      const res = await axios.get(
        "https://emoji-api.com/emojis?access_key=d919239a0302dbe84fd9d72b692602bc26588c9d"
      );
      setEmoji(res.data);
    }
    GetEmoji();
  }, []);

  const SendMessage = async (e) => {
    e.preventDefault();
    const { uid, displayName } = auth.currentUser;
    if (input !== "") {
      await addDoc(collection(db, "Message"), {
        text: input,
        name: displayName,
        uid,
        timestamp: serverTimestamp(),
      });
    } else {
      alert("PlEASE enter a valid Message!!!");
    }
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  emoji.length = 1792; // FOR SHORT
  function addEmoji(emj) {
    setInput(input.concat(emj));
  }

  return (
    <div className="footer">
      <form onSubmit={SendMessage} className="sendMessage">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bn632-hover bn25"
          type="text"
          placeholder="Send some Messages to your Friend"
        />
        <button className="Sbtn" type="submit">
          <BiSend color="#e43603" size={45} />
        </button>

        <div className={vEmoji == true ? "emojis" : "emojisN"}>
          <div className="emG">
            {emoji.map((em) => {
              return (
                <div
                  key={em.codePoint}
                  onClick={() => addEmoji(em.character)}
                  className="em"
                >
                  {em.character}
                </div>
              );
            })}
          </div>
        </div>
      </form>
      <button
        onClick={() => {
          setVEmoji(vEmoji == false ? true : false);
        }}
        className="Embtn"
      >
        <BsEmojiSunglassesFill color="royalblue" size={26} />
      </button>
    </div>
  );
};

export default SendMessage;
