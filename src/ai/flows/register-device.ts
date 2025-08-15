
'use server';

/**
 * @fileOverview A Genkit flow for securely registering a student's device.
 *
 * - registerDevice - A function that handles the device registration logic.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  findRegisteredDevicesByStudentId,
  addPendingDevice,
} from '@/services/deviceService';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
    RegisterDeviceInputSchema, 
    RegisterDeviceOutputSchema,
    type RegisterDeviceInput,
    type RegisterDeviceOutput
} from './register-device.types';


const registerDeviceFlow = ai.defineFlow(
  {
    name: 'registerDeviceFlow',
    inputSchema: RegisterDeviceInputSchema,
    outputSchema: RegisterDeviceOutputSchema,
  },
  async (input) => {
    try {
      const registeredDevices = await findRegisteredDevicesByStudentId(input.studentId);
      const isDeviceAlreadyRegistered = registeredDevices.some(d => d.deviceId === input.deviceId);

      if (isDeviceAlreadyRegistered) {
        return {
          status: 'already-exists',
          message: 'This device is already registered.',
        };
      }
      
      if (registeredDevices.length === 0) {
        const newDeviceRef = doc(collection(db, 'registeredDevices'));
        await setDoc(newDeviceRef, {
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

      const q = query(
        collection(db, 'pendingDevices'), 
        where("deviceId", "==", input.deviceId), 
        where("studentId", "==", input.studentId)
      );
      const existingPendingSnapshot = await getDocs(q);

      if (!existingPendingSnapshot.empty) {
        return {
          status: 'pending',
          message: 'A request for this device is already pending approval.',
        };
      }
      
      await addPendingDevice({
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
