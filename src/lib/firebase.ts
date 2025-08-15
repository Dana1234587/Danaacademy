// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence, type Auth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvUOpOQBLNMPlFPoEjTMl1-14k6Xqyfo8",
  authDomain: "dana-academy-physics.firebaseapp.com",
  projectId: "dana-academy-physics",
  storageBucket: "dana-academy-physics.firebasestorage.app",
  messagingSenderId: "986877154589",
  appId: "1:986877154589:web:2a94f2c9f95be126103df4"
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

// We also export initializeApp and getAuth to be able to create a secondary app instance
// for creating users without signing out the admin.
export { app, db, auth, initializeApp, getAuth, firebaseConfig };
