import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5358o4vbUXM4FrPMVI6C6W3mJXDf9rkU",
  authDomain: "fluid-orbit-1.firebaseapp.com",
  projectId: "fluid-orbit-1",
  storageBucket: "fluid-orbit-1.firebasestorage.app",
  messagingSenderId: "1049673718977",
  appId: "1:1049673718977:web:112f3d1a72039703978840",
  measurementId: "G-XHQRHEWGTB",
};

const app = initializeApp(firebaseConfig);

console.log("Firebase App Name:", app.name);

export const auth = getAuth(app);
export const db = getFirestore(app);
