
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
import { z } from 'zod';

const registerDeviceFlow = ai.defineFlow(
  {
    name: 'registerDeviceFlow',
    inputSchema: RegisterDeviceInputSchema,
    outputSchema: RegisterDeviceOutputSchema,
  },
  async (input) => {
    try {
      const adminDB = admin.firestore();
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
        await adminDB.collection('registeredDevices').add(input);

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
      await adminDB.collection('pendingDevices').add(input);

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

export const rejectDeviceFlow = ai.defineFlow(
  {
    name: 'rejectDeviceFlow',
    inputSchema: z.string().describe("The ID of the pending device document to reject."),
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (pendingDeviceId) => {
    try {
      const adminDB = admin.firestore();
      await adminDB.collection('pendingDevices').doc(pendingDeviceId).delete();
      return { success: true };
    } catch (error: any) {
      console.error('Error rejecting device:', error);
      return { success: false };
    }
  }
);


export async function registerDevice(
  input: RegisterDeviceInput
): Promise<RegisterDeviceOutput> {
  return registerDeviceFlow(input);
}

export async function rejectDevice(id: string) {
    return rejectDeviceFlow(id);
}
