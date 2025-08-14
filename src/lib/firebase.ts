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
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

export { app, db, auth };