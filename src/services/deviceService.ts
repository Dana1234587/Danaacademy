

'use server';

import { adminDB } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

// This is the new, more detailed structure for device info.
type DeviceInfo = {
  ua?: string;
  os?: string;
  osVersion?: string;
  browser?: string;
  browserVersion?: string;
  deviceType?: string;
  deviceVendor?: string;
  deviceModel?: string;
};

// Simplified base device type
type BaseDevice = {
    studentId: string;
    studentName: string;
    deviceId: string;
    courses: string[];
    ipAddress?: string;
    deviceInfo?: DeviceInfo;
};

// Extend base type for Pending and Registered devices
export type PendingDevice = BaseDevice & {
    id: string; // Document ID from Firestore
    registeredAt: string; // ISO string format
};

export type RegisteredDevice = BaseDevice & {
    id: string; // Document ID from Firestore
    registeredAt: string; // ISO string format
};


const pendingDevicesCol = adminDB.collection('pendingDevices');
const registeredDevicesCol = adminDB.collection('registeredDevices');

export async function addDeviceToPending(deviceData: Omit<PendingDevice, 'id' | 'registeredAt'>): Promise<void> {
    await pendingDevicesCol.add({
        ...deviceData,
        registeredAt: Timestamp.now(),
    });
}

export async function addDeviceToRegistered(deviceData: Omit<RegisteredDevice, 'id' | 'registeredAt'>): Promise<void> {
    await registeredDevicesCol.add({
        ...deviceData,
        registeredAt: Timestamp.now(),
    });
}

export async function getPendingDevices(): Promise<PendingDevice[]> {
    const snapshot = await pendingDevicesCol.orderBy('registeredAt', 'desc').get();
    if(snapshot.empty) return [];
    return snapshot.docs.map(doc => {
        const data = doc.data();
        const registeredAtTimestamp = data.registeredAt as Timestamp | undefined;
        return { 
            id: doc.id, 
            ...data,
            registeredAt: registeredAtTimestamp ? registeredAtTimestamp.toDate().toISOString() : new Date().toISOString(),
        } as PendingDevice;
    });
}

// Corrected function to reliably get all devices
export async function getAllRegisteredDevices(): Promise<RegisteredDevice[]> {
    const snapshot = await registeredDevicesCol.orderBy('registeredAt', 'desc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
        const data = doc.data();
        const registeredAtTimestamp = data.registeredAt as Timestamp | undefined;
        return {
            id: doc.id,
            studentId: data.studentId || '',
            studentName: data.studentName || 'Unknown Student',
            deviceId: data.deviceId || '',
            courses: data.courses || [],
            ipAddress: data.ipAddress,
            deviceInfo: data.deviceInfo,
            registeredAt: registeredAtTimestamp ? registeredAtTimestamp.toDate().toISOString() : new Date().toISOString(),
        } as RegisteredDevice;
    });
}


export async function findRegisteredDevicesByStudentId(studentId: string): Promise<RegisteredDevice[]> {
    const q = registeredDevicesCol.where("studentId", "==", studentId);
    const snapshot = await q.get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
         const data = doc.data();
         const registeredAtTimestamp = data.registeredAt as Timestamp;
        return { 
            id: doc.id, 
            ...data,
            registeredAt: registeredAtTimestamp.toDate().toISOString(),
        } as RegisteredDevice
    });
}

export async function approveDevice(pendingDeviceId: string, mode: 'replace' | 'add'): Promise<void> {
    const pendingDeviceRef = pendingDevicesCol.doc(pendingDeviceId);
    const pendingDeviceSnap = await pendingDeviceRef.get();
    
    if (!pendingDeviceSnap.exists) {
        throw new Error("Device not found in pending list.");
    }
    
    const deviceToApproveData = pendingDeviceSnap.data() as Omit<PendingDevice, 'id'>;

    const batch = adminDB.batch();

    if (mode === 'replace') {
        const oldDevicesQuery = registeredDevicesCol.where("studentId", "==", deviceToApproveData.studentId);
        const oldDevicesSnapshot = await oldDevicesQuery.get();
        oldDevicesSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
    }
    
    const newRegisteredDeviceRef = registeredDevicesCol.doc();
    batch.set(newRegisteredDeviceRef, {
        ...deviceToApproveData,
        registeredAt: Timestamp.now() // Set registration time on approval
    });
    
    batch.delete(pendingDeviceRef);

    await batch.commit();
}


export async function rejectPendingDevice(pendingDeviceId: string): Promise<void> {
    const pendingDeviceRef = pendingDevicesCol.doc(pendingDeviceId);
    await pendingDeviceRef.delete();
}


export async function deleteRegisteredDevice(deviceId: string): Promise<void> {
    await registeredDevicesCol.doc(deviceId).delete();
}

export async function deleteRegisteredDeviceByStudentId(studentId: string): Promise<void> {
    const q = registeredDevicesCol.where("studentId", "==", studentId);
    const snapshot = await q.get();
    
    if (snapshot.empty) return;

    const batch = adminDB.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
}

export async function updateDeviceBrowserInfo(deviceId: string, studentId: string, browser: string): Promise<void> {
    try {
        const q = registeredDevicesCol.where('deviceId', '==', deviceId).where('studentId', '==', studentId);
        const querySnapshot = await q.get();

        if (!querySnapshot.empty) {
            const deviceDocRef = querySnapshot.docs[0].ref;
            await deviceDocRef.update({ 'deviceInfo.browser' : browser }); // Use dot notation for nested fields
        } else {
             // Also check pending devices
            const pendingQ = pendingDevicesCol.where('deviceId', '==', deviceId).where('studentId', '==', studentId);
            const pendingSnapshot = await pendingQ.get();
            if(!pendingSnapshot.empty) {
                 const deviceDocRef = pendingSnapshot.docs[0].ref;
                 await deviceDocRef.update({ 'deviceInfo.browser' : browser });
            }
        }
    } catch (error) {
        console.error("Error updating device browser info:", error);
    }
}
