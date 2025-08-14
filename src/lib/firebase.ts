// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "dana-academy-physics",
  "appId": "1:986877154589:web:2a94f2c9f95be126103df4",
  "storageBucket": "dana-academy-physics.firebasestorage.app",
  "apiKey": "AIzaSyCvUOpOQBLNMPlFPoEjTMl1-14k6Xqyfo8",
  "authDomain": "dana-academy-physics.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "986877154589"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);


export { app, db, auth };
