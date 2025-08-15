// src/lib/firebase-admin.ts
import admin from 'firebase-admin';
import { firebaseConfig } from './firebase'; // We can reuse the config

// Check if the admin app is already initialized
if (!admin.apps.length) {
  try {
    // When running in a Google Cloud environment, the SDK can auto-discover credentials
    admin.initializeApp({
        // If you have a service account JSON, you would use:
        // credential: admin.credential.cert(serviceAccount),
        // but for App Hosting, auto-discovery is preferred.
        projectId: firebaseConfig.projectId,
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
