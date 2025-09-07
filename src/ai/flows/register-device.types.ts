

import { z } from 'genkit';

/**
 * @fileOverview This file defines the data structures (types and schemas)
 * for the device registration flow. It is separated from the main flow
 * file to comply with Next.js 'use server' module constraints.
 *
 * - RegisterDeviceInput - The input type for the registerDevice function.
 * - RegisterDeviceOutput - The return type for the registerDevice function.
 */

export const RegisterDeviceInputSchema = z.object({
  studentId: z.string().describe('The UID of the student.'),
  studentName: z.string().describe('The name of the student.'),
  deviceId: z.string().describe('The unique identifier for the device.'),
  os: z.string().describe('The operating system of the device.'),
  browser: z.string().optional().describe('The browser used by the device.'),
  deviceType: z.string().describe('The type of the device (e.g., Mobile, Desktop).'),
  courses: z.array(z.string()).describe('The courses the student is enrolled in.'),
});
export type RegisterDeviceInput = z.infer<typeof RegisterDeviceInputSchema>;

export const RegisterDeviceOutputSchema = z.object({
  status: z
    .enum(['registered', 'pending', 'already-exists', 'error'])
    .describe('The result of the registration attempt.'),
  message: z.string().describe('A message describing the result.'),
});
export type RegisterDeviceOutput = z.infer<typeof RegisterDeviceOutputSchema>;
