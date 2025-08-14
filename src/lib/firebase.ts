// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFmLhtF8hObMqY7yLuLdjpjsCjuO5GQXk",
  authDomain: "dana-physics-academy.firebaseapp.com",
  projectId: "dana-physics-academy",
  storageBucket: "dana-physics-academy.firebasestorage.app",
  messagingSenderId: "103537274842",
  appId: "1:103537274842:web:564729a5095355461d5ae3"
};

// Singleton pattern to ensure a single Firebase instance
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, db, auth };
