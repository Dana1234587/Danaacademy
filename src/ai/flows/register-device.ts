
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
import { adminDB } from '@/lib/firebase-admin';
import { z } from 'zod';
import { headers } from 'next/headers';
import { updateStudentBrowserInfo } from '@/services/studentService';


const registerDeviceFlow = ai.defineFlow(
  {
    name: 'registerDeviceFlow',
    inputSchema: RegisterDeviceInputSchema,
    outputSchema: RegisterDeviceOutputSchema,
  },
  async (input) => {
    try {
      const headerMap = headers();
      const ipAddress = headerMap.get('x-forwarded-for') || 'IP Not Found';
      
      // Update student's browser info in the student document itself.
      if (input.studentId && input.deviceInfo?.browser) {
        await updateStudentBrowserInfo(input.studentId, {
            name: input.deviceInfo.browser,
            os: input.deviceInfo.os,
        });
      }

      // Construct the full data object to be stored for the device.
      const fullDeviceData = { ...input, ipAddress };

      const registeredDevicesCol = adminDB.collection('registeredDevices');
      const pendingDevicesCol = adminDB.collection('pendingDevices');

      // Check for existing registered device
      const registeredQuery = registeredDevicesCol.where("studentId", "==", fullDeviceData.studentId);
      const registeredSnapshot = await registeredQuery.get();
      const registeredDevices = registeredSnapshot.docs.map(doc => doc.data());

      const isDeviceAlreadyRegistered = registeredDevices.some(d => d.deviceId === fullDeviceData.deviceId);
      if (isDeviceAlreadyRegistered) {
        return {
          status: 'already-exists',
          message: 'This device is already registered.',
        };
      }
      
      // If no registered devices, this is the first device.
      if (registeredDevices.length === 0) {
        await adminDB.collection('registeredDevices').add(fullDeviceData);

        return {
          status: 'registered',
          message: 'Device registered successfully as the first device.',
        };
      }

      // If it's a new device and not the first, check if a pending request already exists.
      const pendingQuery = pendingDevicesCol
        .where("deviceId", "==", fullDeviceData.deviceId)
        .where("studentId", "==", fullDeviceData.studentId);
      const existingPendingSnapshot = await pendingQuery.get();

      if (!existingPendingSnapshot.empty) {
        return {
          status: 'pending',
          message: 'A request for this device is already pending approval.',
        };
      }
      
      // If no pending request, create one.
      await adminDB.collection('pendingDevices').add(fullDeviceData);

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


export const rejectDeviceFlow = ai.defineFlow(
    {
        name: 'rejectDeviceFlow',
        inputSchema: z.string(),
        outputSchema: z.void(),
    },
    async (pendingDeviceId) => {
        await adminDB.collection('pendingDevices').doc(pendingDeviceId).delete();
    }
);
