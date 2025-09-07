
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
import { headers } from 'next/headers';


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
      
      const fullDeviceData = {
        studentId: input.studentId,
        studentName: input.studentName,
        deviceId: input.deviceId,
        courses: input.courses,
        deviceInfo: input.deviceInfo,
        ipAddress: ipAddress,
      };


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
      // Specific error for database writing issues
      if (error.code && (error.code.startsWith('firestore/') || error.code.startsWith('permission-denied'))) {
           return {
            status: 'error',
            message: `فشل الكتابة إلى قاعدة البيانات: ${error.message}`,
           };
      }
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
