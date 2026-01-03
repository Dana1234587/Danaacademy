import admin from 'firebase-admin';

let initialized = false;

function ensureInitialized() {
  if (initialized) return;

  const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error('SERVICE_ACCOUNT_KEY is not defined in environment variables. Please add it to your .env file.');
  }

  if (admin.apps.length === 0) {
    try {
      const parsedKey = JSON.parse(serviceAccountKey);
      // Fix escaped newlines in private_key (common .env issue)
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
        throw error; // Re-throw to prevent using uninitialized SDK
      }
    }
  }

  initialized = true;
}

// Lazy getters - initialize only when first accessed
function getAdminDB() {
  ensureInitialized();
  return admin.firestore();
}

function getAdminAuth() {
  ensureInitialized();
  return admin.auth();
}

// For backward compatibility, export getters as proxies
const adminDB = new Proxy({} as FirebaseFirestore.Firestore, {
  get(_, prop) {
    return (getAdminDB() as any)[prop];
  }
});

const adminAuth = new Proxy({} as admin.auth.Auth, {
  get(_, prop) {
    return (getAdminAuth() as any)[prop];
  }
});

export { adminDB, adminAuth, getAdminDB, getAdminAuth };
