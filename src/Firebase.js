import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFtOMAQ2Ds5n4ldFuYJ4oPW86ISJSHsL4",
  authDomain: "chat-app-3ea5f.firebaseapp.com",
  projectId: "chat-app-3ea5f",
  storageBucket: "chat-app-3ea5f.appspot.com",
  messagingSenderId: "621967986188",
  appId: "1:621967986188:web:35142d16b67fd845bf6829"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();