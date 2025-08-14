// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN3aaAQerX3GU2BPNwjiHcgdJ7ne-3dPw",
  authDomain: "danaacademy-d6b29.firebaseapp.com",
  projectId: "danaacademy-d6b29",
  storageBucket: "danaacademy-d6b29.firebasestorage.app",
  messagingSenderId: "1039366223124",
  appId: "1:1039366223124:web:2ee9ff51f64bf9042c3e01",
  measurementId: "G-K77THJQ4ZL"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);


export { app, db, auth };
