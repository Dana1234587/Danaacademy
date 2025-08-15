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
    console.error('Firebase admin initialization error:', error.message);
  }
}

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
