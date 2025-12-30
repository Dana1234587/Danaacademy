import admin from 'firebase-admin';

let initialized = false;

function initializeFirebaseAdmin() {
  if (initialized) return true;

  const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    // Don't throw during build - just skip initialization
    console.warn('SERVICE_ACCOUNT_KEY not available - Firebase Admin SDK not initialized');
    return false;
  }

  // Prevent re-initialization in hot-reload environments
  if (admin.apps.length === 0) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
      });
      console.log("Firebase Admin SDK initialized successfully.");
    } catch (error: any) {
      if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error:', error.stack);
        return false;
      }
    }
  }

  initialized = true;
  return true;
}

// Lazy proxy for adminDB - only initializes when actually used
const adminDB = new Proxy({} as FirebaseFirestore.Firestore, {
  get(_, prop) {
    if (!initializeFirebaseAdmin()) {
      throw new Error('Firebase Admin SDK not initialized - SERVICE_ACCOUNT_KEY may be missing');
    }
    const db = admin.firestore();
    return (db as any)[prop];
  }
});

// Lazy proxy for adminAuth - only initializes when actually used
const adminAuth = new Proxy({} as admin.auth.Auth, {
  get(_, prop) {
    if (!initializeFirebaseAdmin()) {
      throw new Error('Firebase Admin SDK not initialized - SERVICE_ACCOUNT_KEY may be missing');
    }
    const auth = admin.auth();
    return (auth as any)[prop];
  }
});

export { adminDB, adminAuth };
