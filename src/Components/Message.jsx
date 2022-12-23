import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { auth, db } from "../firebase";
import { RiReplyLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { useRef } from "react";

const Message = ({
  messages,
  message,
  replyN,
  setReplyN,
  replyT,
  setReplyT,
}) => {
  const [event, setEvent] = useState(false);
  const [tState, setTState] = useState(true);
  const [upText, setUpText] = useState("");
  const txtRef = useRef(null);
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

  async function replyMessage(id) {
    await messages.filter((el) => {
      setReplyN((replyN = el.name));
      setReplyT((replyT = el.text));
      //
      if (el.id === id && el.name !== replyN && el.text !== replyT) {
        updateDoc(doc(db, "Message", el.id), {
          replyN,
          replyT,
        });
      }
      setReplyN((replyN = el.name));
      setReplyT((replyT = el.text));
    });
  }
  async function updateMs(text, message) {
    setUpText(message.text);
    await updateDoc(doc(db, "Message", message.id), {
      text,
    });
    txtRef.current.focus();
  }
  async function copyText(text) {
    await setTState(false);
    setUpText(text);
    txtRef.current.select();
    document.execCommand("copy");
    setTState(true);
  }

  return (
    <AnimatePresence initial={true} exitBeforeEnter={false}>
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
          <div className="rM">
            <div className="rMsgM">
              {message.replyN && (
                <>
                  <h2>{message.replyN}</h2>
                  <p>{message.replyT}</p>
                </>
              )}
            </div>
          </div>
          <div className="reply">
            <button onClick={() => replyMessage(message.id)}>
              <RiReplyLine color="#4285f4" size={23} />
            </button>
          </div>
          <div
            className={
              message.uid === auth.currentUser.uid && event
                ? " events"
                : "eventsN"
            }
          >
            <button
              onClick={() =>
                message.uid === auth.currentUser.uid && delMessage(message.id)
              }
              className="del smS"
            >
              <AiOutlineDelete /> <span>Delete</span>
            </button>
            <button
              onClick={(e) => {
                tState && e.stopPropagation();
                setTState(tState == false ? true : false);
                updateMs(upText, message);
              }}
              className={tState ? " smS" : "changed smS"}
            >
              <BsPencilSquare /> <span>Change</span>
            </button>
            <button onClick={() => copyText(message.text)} className="smS copy">
              <BiCopy />
              <span> Copy</span>
            </button>
          </div>

          <p className="name">{message.name}</p>

          <textarea
            ref={txtRef}
            className={message.text.length > 120 && "textarea"}
            onChange={(e) => {
              setUpText(e.target.value);
            }}
            disabled={tState}
            type="text"
            value={tState ? message.text : upText}
          />
          {/* <div className="time">
            <span></span>
          </div> */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Message;
