// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence, type Auth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFmLhtF8hObMqY7yLuLdjpjsCjuO5GQXk",
  authDomain: "dana-physics-academy.firebaseapp.com",
  projectId: "dana-physics-academy",
  storageBucket: "dana-physics-academy.firebasestorage.app",
  messagingSenderId: "103537274842",
  appId: "1:103537274842:web:564729a5095355461d5ae3"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, db, auth };
