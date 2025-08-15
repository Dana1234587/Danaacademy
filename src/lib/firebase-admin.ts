// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { firebaseConfig } from './firebase';

if (!admin.apps.length) {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Running locally, use the service account key
      const serviceAccount = require('../../serviceAccountKey.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: firebaseConfig.projectId,
      });
    } else {
      // Running in a Google Cloud environment (App Hosting), auto-discover credentials
      admin.initializeApp({
        projectId: firebaseConfig.projectId,
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
