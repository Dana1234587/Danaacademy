// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFmLhtF8h0bMqY7yLuLdjpjsCju05GQXk",
  authDomain: "dana-physics-academy.firebaseapp.com",
  projectId: "dana-physics-academy",
  storageBucket: "dana-physics-academy.firebasestorage.app",
  messagingSenderId: "103537274842",
  appId: "1:103537274842:web:564729a5095355461d5ae3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);


export { app, db, auth };
