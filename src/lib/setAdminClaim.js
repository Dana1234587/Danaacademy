// This script is designed to be run once from your local machine to set a custom admin claim on a user.
// It uses the Firebase Admin SDK, which has full access to your project. DO NOT run this on the client-side.

// 1. Go to Firebase Console > Project Settings > Service accounts.
// 2. Click "Generate new private key". A JSON file will be downloaded.
// 3. Rename this file to "serviceAccountKey.json" and place it in the ROOT directory of your project (the same level as package.json).
// 4. Make sure the UID below is correct for your admin account.
// 5. Run `npm install` in your terminal to install firebase-admin.
// 6. Run this script from your terminal using: `node src/lib/setAdminClaim.js`
// 7. After successful execution, you can delete this file and the serviceAccountKey.json file.

const admin = require('firebase-admin');
const path = require('path');

// IMPORTANT: Path to your service account key file
const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json');
const serviceAccount = require(serviceAccountPath);

// The UID of the user you want to make an admin.
// This is the UID for admin@dana-academy.com that you provided.
const adminUid = 'izQXahEpQbUAYwx4yiXN4nedW312';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.auth().setCustomUserClaims(adminUid, { admin: true })
  .then(() => {
    console.log(`Success! Custom claim set for user: ${adminUid}`);
    console.log('User is now an admin. You can now proceed to the next stage.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error setting custom user claims:', error);
    process.exit(1);
  });
