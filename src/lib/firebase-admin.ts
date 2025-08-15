
// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { config } from 'dotenv';

// Load environment variables from .env file. This is crucial for local development.
config();

const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

// This check prevents re-initializing the app in hot-reload scenarios
if (!admin.apps.length) {
  try {
    if (serviceAccountKey) {
      // We are in a local development environment, use the service account key from .env
      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: "dana-academy-physics",
      });
       console.log("Firebase Admin SDK initialized for LOCAL development.");
    } else {
      // We are in a production environment (e.g., Firebase Hosting, Vercel),
      // use Application Default Credentials.
      admin.initializeApp({
        projectId: "dana-academy-physics",
      });
      console.log("Firebase Admin SDK initialized for PRODUCTION environment.");
    }
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error);
    // Log the error but don't re-throw, to avoid crashing the server on startup.
  }
}

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
