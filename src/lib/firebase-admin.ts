import admin from 'firebase-admin';

let initialized = false;

function initializeFirebaseAdmin() {
  if (initialized) return true;

  const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

  // Debug logging
  console.log('SERVICE_ACCOUNT_KEY exists:', !!serviceAccountKey);
  console.log('SERVICE_ACCOUNT_KEY length:', serviceAccountKey?.length || 0);
  console.log('SERVICE_ACCOUNT_KEY starts with:', serviceAccountKey?.substring(0, 20) || 'N/A');

  if (!serviceAccountKey) {
    // Don't throw during build - just skip initialization
    console.warn('SERVICE_ACCOUNT_KEY not available - Firebase Admin SDK not initialized');
    return false;
  }

  // Prevent re-initialization in hot-reload environments
  if (admin.apps.length === 0) {
    try {
      // Parse the service account key
      const parsedKey = JSON.parse(serviceAccountKey);

      // Fix double-escaped newlines in private_key (common issue with Vercel env vars)
      if (parsedKey.private_key) {
        parsedKey.private_key = parsedKey.private_key.replace(/\\n/g, '\n');
      }

      admin.initializeApp({
        credential: admin.credential.cert(parsedKey),
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
