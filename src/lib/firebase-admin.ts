import admin from 'firebase-admin';
import { config } from 'dotenv';

config();

const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

if (!admin.apps.length) {
  try {
    const credential = serviceAccountKey
      ? admin.credential.cert(JSON.parse(serviceAccountKey))
      : admin.credential.applicationDefault();

    admin.initializeApp({
      credential,
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error: any) {
    // In a serverless environment, sometimes the error is that the app is already initialized.
    // We can ignore this specific error.
    if (error.code !== 'auth/credential-already-in-use') {
        console.error('Firebase admin initialization error:', error.message);
    }
  }
}

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
