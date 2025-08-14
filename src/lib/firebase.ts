// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// =================================================================
// TODO: استبدلي هذا الكائن بالإعدادات من مشروعك على Firebase
// 1. اذهبي إلى console.firebase.google.com
// 2. أنشئي مشروعًا جديدًا أو اختاري مشروعًا موجودًا.
// 3. أضيفي تطبيق ويب (Web App).
// 4. انسخي كائن firebaseConfig من هناك والصقيه هنا.
// =================================================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", //  <-- ضعي القيمة هنا
  authDomain: "YOUR_AUTH_DOMAIN", //  <-- ضعي القيمة هنا
  projectId: "YOUR_PROJECT_ID", //  <-- ضعي القيمة هنا
  storageBucket: "YOUR_STORAGE_BUCKET", //  <-- ضعي القيمة هنا
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", //  <-- ضعي القيمة هنا
  appId: "YOUR_APP_ID" //  <-- ضعي القيمة هنا
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);


export { app, db, auth };
