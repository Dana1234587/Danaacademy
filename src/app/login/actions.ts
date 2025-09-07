

'use server';

import type { RegisterDeviceInput, RegisterDeviceOutput } from '@/ai/flows/register-device.types';
import { adminDB } from '@/lib/firebase-admin';
import { headers } from 'next/headers';


export async function registerDeviceAction(input: Omit<RegisterDeviceInput, 'ipAddress'>): Promise<RegisterDeviceOutput> {
    const headerMap = headers();
    const ipAddress = headerMap.get('x-forwarded-for') || 'IP Not Found';
    
    // Ensure all fields, including the optional browser field, are included.
    const fullInput: RegisterDeviceInput = { 
        ...input, 
        ipAddress 
    };

    try {
      const registeredDevicesCol = adminDB.collection('registeredDevices');
      const pendingDevicesCol = adminDB.collection('pendingDevices');

      // Check for existing registered device
      const registeredQuery = registeredDevicesCol.where("studentId", "==", fullInput.studentId);
      const registeredSnapshot = await registeredQuery.get();
      const registeredDevices = registeredSnapshot.docs.map(doc => doc.data());

      const isDeviceAlreadyRegistered = registeredDevices.some(d => d.deviceId === fullInput.deviceId);
      if (isDeviceAlreadyRegistered) {
        return {
          status: 'already-exists',
          message: 'This device is already registered.',
        };
      }
      
      // If no registered devices, this is the first device.
      if (registeredDevices.length === 0) {
        await adminDB.collection('registeredDevices').add(fullInput);

        return {
          status: 'registered',
          message: 'Device registered successfully as the first device.',
        };
      }

      // If it's a new device and not the first, check if a pending request already exists.
      const pendingQuery = pendingDevicesCol
        .where("deviceId", "==", fullInput.deviceId)
        .where("studentId", "==", fullInput.studentId);
      const existingPendingSnapshot = await pendingQuery.get();

      if (!existingPendingSnapshot.empty) {
        return {
          status: 'pending',
          message: 'A request for this device is already pending approval.',
        };
      }
      
      // If no pending request, create one.
      await adminDB.collection('pendingDevices').add(fullInput);

      return {
        status: 'pending',
        message: 'New device detected. A request has been sent for approval.',
      };

    } catch (error: any) {
      console.error('Error in registerDeviceAction:', error);
      const errorMessage = error.message || 'An unknown error occurred during device registration.';
      return {
        status: 'error',
        message: `Server Error: ${errorMessage}`,
      };
    }
}

    