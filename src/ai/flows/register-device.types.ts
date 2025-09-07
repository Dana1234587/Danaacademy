

import { z } from 'genkit';

/**
 * @fileOverview This file defines the data structures (types and schemas)
 * for the device registration flow. It is separated from the main flow
 * file to comply with Next.js 'use server' module constraints.
 */

// Schema for detailed device information
export const DeviceInfoSchema = z.object({
  os: z.string().optional().describe('Operating System (e.g., Windows, Android)'),
  browser: z.string().optional().describe('Browser name (e.g., Chrome, Safari)'),
  deviceType: z.string().optional().describe('Device type (e.g., Mobile, Desktop)'),
}).optional();


export const RegisterDeviceInputSchema = z.object({
  studentId: z.string().describe('The UID of the student.'),
  studentName: z.string().describe('The name of the student.'),
  deviceId: z.string().describe('The unique identifier for the device.'),
  deviceInfo: DeviceInfoSchema,
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
