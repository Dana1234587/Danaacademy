import admin from 'firebase-admin';

function initializeFirebaseAdmin() {
  const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    // This will stop execution if the key is not found, which is what we want.
    // The key should be present in Vercel's env variables and in the local .env file.
    throw new Error('SERVICE_ACCOUNT_KEY is not defined in environment variables. Please add it to your .env file.');
  }

  // Prevent re-initialization in hot-reload environments
  if (admin.apps.length === 0) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
      });
      console.log("Firebase Admin SDK initialized successfully.");
    } catch (error: any) {
      // This catch block is for safety, though the length check should prevent it.
      if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error:', error.stack);
      }
    }
  }
}

// Initialize immediately when this module is imported.
initializeFirebaseAdmin();

const adminDB = admin.firestore();
const adminAuth = admin.auth();

export { adminDB, adminAuth };
