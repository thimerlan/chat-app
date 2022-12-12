// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB63rjd7cytq2I_Y4a_2DJFiRWCcHChjHU",
  authDomain: "chat-app-ab379.firebaseapp.com",
  projectId: "chat-app-ab379",
  storageBucket: "chat-app-ab379.appspot.com",
  messagingSenderId: "802517883957",
  appId: "1:802517883957:web:469f23a61601338a01e57c",
  measurementId: "G-RS0TR3SV0D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
