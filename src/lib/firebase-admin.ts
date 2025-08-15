// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { firebaseConfig } from './firebase';

// This check prevents re-initializing the app in hot-reload scenarios
if (!admin.apps.length) {
  try {
    // When running locally, we use the service account key file.
    // In a deployed environment (like App Hosting), the SDK auto-discovers credentials.
    const serviceAccount = process.env.SERVICE_ACCOUNT_KEY 
      ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY)
      : require('../../serviceAccountKey.json');
      
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: firebaseConfig.projectId,
    });

  } catch (error: any) {
    // If the service account key is not found, it might be a Vercel/production environment
    // where credentials should be auto-discovered.
    if (error.code === 'MODULE_NOT_FOUND') {
        console.log("Service account key not found, attempting to initialize with default credentials...");
        admin.initializeApp({
            projectId: firebaseConfig.projectId,
        });
    } else {
        console.error('Firebase admin initialization error:', error);
    }
  }
}

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
