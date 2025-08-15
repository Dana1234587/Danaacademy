
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const firebaseConfig = {
  projectId: "dana-academy-physics",
};

// This check prevents re-initializing the app in hot-reload scenarios
if (!admin.apps.length) {
  try {
    const serviceAccountString = process.env.SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountString) {
      const serviceAccount = JSON.parse(serviceAccountString);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: firebaseConfig.projectId,
      });
      console.log("Firebase Admin SDK initialized successfully with Service Account.");
    } else {
      // In a deployed environment (like App Hosting or Vercel), the SDK auto-discovers credentials.
      console.log("Service account key not found in environment variables, attempting to initialize with default credentials...");
      admin.initializeApp({
          projectId: firebaseConfig.projectId,
      });
      console.log("Firebase Admin SDK initialized successfully with default credentials.");
    }
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error);
  }
}

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
