import admin from 'firebase-admin';
import { config } from 'dotenv';

config();

const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountKey!)),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error: any) {
    // In a serverless environment, sometimes the error is that the app is already initialized.
    // We can ignore this specific error.
    if (!/already exists/u.test(error.message)) {
      console.error('Firebase admin initialization error:', error.message);
    }
  }
}

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
