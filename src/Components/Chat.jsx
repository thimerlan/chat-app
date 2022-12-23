import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [replyN, setReplyN] = useState("");
  const [replyT, setReplyT] = useState("");
  const [spin, setSpin] = useState(false);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, "Message"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      setSpin(true);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <main>
        <div className="chat-container">
          {messages.length ? (
            messages.map((ms) => (
              <Message
                key={ms.id}
                message={ms}
                replyN={replyN}
                replyT={replyT}
                setReplyN={setReplyN}
                setReplyT={setReplyT}
                messages={messages}
              />
            ))
          ) : (
            <h2 className="uNull">
              {!spin && <SyncLoader color="#1dcceb" size={30} />}
              {spin ? "There are no messages yet!!!" : ""}
            </h2>
          )}
        </div>
      </main>
      <SendMessage
        replyN={replyN}
        replyT={replyT}
        setReplyN={setReplyN}
        setReplyT={setReplyT}
        messages={messages}
        scroll={scroll}
      />
      <span ref={scroll}></span>
    </>
  );
};

export default Chat;
