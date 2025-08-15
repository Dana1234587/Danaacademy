
'use server';

/**
 * @fileOverview A Genkit flow for securely registering a student's device.
 *
 * - registerDevice - A function that handles the device registration logic.
 */

import { ai } from '@/ai/genkit';
import { 
    RegisterDeviceInputSchema, 
    RegisterDeviceOutputSchema,
    type RegisterDeviceInput,
    type RegisterDeviceOutput
} from './register-device.types';
import admin from 'firebase-admin';

// Self-contained Firebase Admin initialization for Vercel/local compatibility
const getAdminDB = () => {
    const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

    if (admin.apps.length === 0) {
        try {
            // Check if service account key is available (for Vercel)
            if (serviceAccountKey) {
                admin.initializeApp({
                    credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
                });
            } else {
                // Otherwise, use Application Default Credentials (for local development)
                console.log("Service account key not found, using Application Default Credentials.");
                admin.initializeApp();
            }
        } catch (error: any) {
             // This can happen in hot-reload environments, it's safe to ignore.
             if (!/already exists/u.test(error.message)) {
                console.error('Firebase admin initialization error:', error.stack);
                throw error; // Re-throw other errors
            }
        }
    }
    return admin.firestore();
};


const registerDeviceFlow = ai.defineFlow(
  {
    name: 'registerDeviceFlow',
    inputSchema: RegisterDeviceInputSchema,
    outputSchema: RegisterDeviceOutputSchema,
  },
  async (input) => {
    try {
      const adminDB = getAdminDB();
      const registeredDevicesCol = adminDB.collection('registeredDevices');
      const pendingDevicesCol = adminDB.collection('pendingDevices');

      // Check for existing registered device
      const registeredQuery = registeredDevicesCol.where("studentId", "==", input.studentId);
      const registeredSnapshot = await registeredQuery.get();
      const registeredDevices = registeredSnapshot.docs.map(doc => doc.data());

      const isDeviceAlreadyRegistered = registeredDevices.some(d => d.deviceId === input.deviceId);
      if (isDeviceAlreadyRegistered) {
        return {
          status: 'already-exists',
          message: 'This device is already registered.',
        };
      }
      
      // If no registered devices, this is the first device.
      if (registeredDevices.length === 0) {
        await adminDB.collection('registeredDevices').add({
            studentId: input.studentId,
            studentName: input.studentName,
            deviceId: input.deviceId,
            os: input.os,
            deviceType: input.deviceType,
            courses: input.courses,
            ipAddress: input.ipAddress,
        });

        return {
          status: 'registered',
          message: 'Device registered successfully as the first device.',
        };
      }

      // If it's a new device and not the first, check if a pending request already exists.
      const pendingQuery = pendingDevicesCol
        .where("deviceId", "==", input.deviceId)
        .where("studentId", "==", input.studentId);
      const existingPendingSnapshot = await pendingQuery.get();

      if (!existingPendingSnapshot.empty) {
        return {
          status: 'pending',
          message: 'A request for this device is already pending approval.',
        };
      }
      
      // If no pending request, create one.
      await adminDB.collection('pendingDevices').add({
        studentId: input.studentId,
        studentName: input.studentName,
        deviceId: input.deviceId,
        os: input.os,
        deviceType: input.deviceType,
        courses: input.courses,
        ipAddress: input.ipAddress,
      });

      return {
        status: 'pending',
        message: 'New device detected. A request has been sent for approval.',
      };

    } catch (error: any) {
      console.error('Error in registerDeviceFlow:', error);
      const errorMessage = error.message || 'An unknown error occurred during device registration.';
      return {
        status: 'error',
        message: `Server Error: ${errorMessage}`,
      };
    }
  }
);


export async function registerDevice(
  input: RegisterDeviceInput
): Promise<RegisterDeviceOutput> {
  return registerDeviceFlow(input);
}
