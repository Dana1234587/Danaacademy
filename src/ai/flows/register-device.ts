
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
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; 
import { adminDB } from '@/lib/firebase-admin';


const registerDeviceFlow = ai.defineFlow(
  {
    name: 'registerDeviceFlow',
    inputSchema: RegisterDeviceInputSchema,
    outputSchema: RegisterDeviceOutputSchema,
  },
  async (input) => {
    try {
      const registeredDevicesCol = adminDB.collection('registeredDevices');
      const q = registeredDevicesCol.where("studentId", "==", input.studentId);
      const registeredDevicesSnapshot = await q.get();
      const registeredDevices = registeredDevicesSnapshot.docs.map(doc => doc.data());

      const isDeviceAlreadyRegistered = registeredDevices.some(d => d.deviceId === input.deviceId);

      if (isDeviceAlreadyRegistered) {
        return {
          status: 'already-exists',
          message: 'This device is already registered.',
        };
      }
      
      if (registeredDevices.length === 0) {
        // This is the first device, register it automatically using the Admin SDK.
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
      const pendingDevicesCol = adminDB.collection('pendingDevices');
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
      
      // If no pending request, create one using the Admin SDK.
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
      return {
        status: 'error',
        message: error.message || 'An unknown error occurred during device registration.',
      };
    }
  }
);


export async function registerDevice(
  input: RegisterDeviceInput
): Promise<RegisterDeviceOutput> {
  return registerDeviceFlow(input);
}
