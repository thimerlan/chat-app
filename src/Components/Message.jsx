import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { auth, db } from "../firebase";

const Message = ({ messages }) => {
  const [event, setEvent] = useState(false);

  function EnterMouseEvent(uid) {
    if (uid === auth.currentUser.uid) setEvent(true);
  }
  function CancelMouseEvent(uid) {
    if (uid === auth.currentUser.uid) setEvent(false);
  }
  async function delMessage(id) {
    await deleteDoc(doc(db, "Message", id));
    setEvent(false);
  }

  //   const [user] = useAuthState(auth);

  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter={false}>
        {messages.map((message) => {
          return (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.1, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mC"
              key={message.id}
              onClick={() => CancelMouseEvent(message.uid)}
            >
              <div
                onMouseUp={() => EnterMouseEvent(message.uid)}
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
                className={`${
                  message.uid === auth.currentUser.uid ? "myMessage" : "message"
                }  `}
              >
                <div
                  className={
                    message.uid === auth.currentUser.uid && event
                      ? " events"
                      : "eventsN"
                  }
                >
                  <button
                    onClick={() =>
                      message.uid === auth.currentUser.uid &&
                      delMessage(message.id)
                    }
                    className="del smS"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
                {/* <img src={user.photoURL} alt="Avatar" className="avatar" /> */}
                <p className="name">{message.name}</p>
                <p>{message.text}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default Message;
