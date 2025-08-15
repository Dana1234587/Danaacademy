
'use server';

/**
 * @fileOverview A Genkit flow for securely registering a student's device.
 *
 * - registerDevice - A function that handles the device registration logic.
 * - RegisterDeviceInput - The input type for the registerDevice function.
 * - RegisterDeviceOutput - The return type for the registerDevice function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  findRegisteredDevicesByStudentId,
  addPendingDevice,
} from '@/services/deviceService';
import { collection, doc, setDoc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const RegisterDeviceInputSchema = z.object({
  studentId: z.string().describe('The UID of the student.'),
  studentName: z.string().describe('The name of the student.'),
  deviceId: z.string().describe('The unique identifier for the device.'),
  os: z.string().describe('The operating system of the device.'),
  deviceType: z.enum(['Desktop', 'Mobile']).describe('The type of the device.'),
  courses: z.array(z.string()).describe('The courses the student is enrolled in.'),
  ipAddress: z.string().describe('The IP address of the device.'),
});
export type RegisterDeviceInput = z.infer<typeof RegisterDeviceInputSchema>;

export const RegisterDeviceOutputSchema = z.object({
  status: z
    .enum(['registered', 'pending', 'already-exists', 'error'])
    .describe('The result of the registration attempt.'),
  message: z.string().describe('A message describing the result.'),
});
export type RegisterDeviceOutput = z.infer<typeof RegisterDeviceOutputSchema>;


// Exported wrapper function to be called from the client
export async function registerDevice(
  input: RegisterDeviceInput
): Promise<RegisterDeviceOutput> {
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
        
        // Handle first-time device registration
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

        // Handle new device when other devices are already registered
        // Check if a pending request for this device already exists to avoid duplicates
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
  return registerDeviceFlow(input);
}
