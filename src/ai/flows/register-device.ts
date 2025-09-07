
'use server';

/**
 * @fileOverview A Genkit flow for securely registering a student's device.
 * This flow is the single point of entry for device registration logic.
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
import { findRegisteredDevicesByStudentId, addDeviceToPending, addDeviceToRegistered } from '@/services/deviceService';


/**
 * Registers a device after checking business logic (e.g., if it's the first device,
 * if it's already registered, or if it needs admin approval).
 * This is the primary entry point for device registration from the client.
 * @param input The device and student information.
 * @returns A status object indicating the result of the registration attempt.
 */
export async function registerDevice(
  input: RegisterDeviceInput
): Promise<RegisterDeviceOutput> {
  // All logic is now encapsulated in the Genkit flow.
  return registerDeviceFlow(input);
}


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

      const pendingDevicesCol = adminDB.collection('pendingDevices');
      const registeredDevices = await findRegisteredDevicesByStudentId(fullDeviceData.studentId);
      const isDeviceAlreadyRegistered = registeredDevices.some(d => d.deviceId === fullDeviceData.deviceId);

      if (isDeviceAlreadyRegistered) {
        return {
          status: 'registered',
          message: 'This device is already registered.',
        };
      }
      
      if (registeredDevices.length === 0) {
        await addDeviceToRegistered(fullDeviceData);
        return {
          status: 'registered',
          message: 'Device registered successfully as the first device.',
        };
      }

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
      
      await addDeviceToPending(fullDeviceData);

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
