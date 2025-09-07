
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

export type Device = {
  id: string;
  studentId: string;
  studentName: string;
  deviceId: string;
  ipAddress: string;
  deviceInfo?: DeviceInfo; 
  courses: string[];
  registeredAt: Date | string; // Allow for serialized date
};

export type PendingDevice = Omit<Device, 'id' | 'registeredAt'> & {
    registeredAt?: Date | string;
};
export type RegisteredDevice = Device;

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

export async function getPendingDevices(): Promise<(PendingDevice & {id: string})[]> {
    const snapshot = await pendingDevicesCol.orderBy('registeredAt', 'desc').get();
    if(snapshot.empty) return [];
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
            id: doc.id, 
            ...data,
            registeredAt: (data.registeredAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
        } as PendingDevice & {id: string};
    });
}

export async function getRegisteredDevices(): Promise<RegisteredDevice[]> {
    const snapshot = await registeredDevicesCol.orderBy('registeredAt', 'desc').get();
    if(snapshot.empty) return [];
    return snapshot.docs.map(doc => {
        const data = doc.data();
        const studentName = data.studentName || 'طالب محذوف'; // Fallback for deleted students

        return { 
            id: doc.id, 
            ...data,
            studentName,
            registeredAt: (data.registeredAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
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
        return { 
            id: doc.id, 
            ...doc.data(),
            registeredAt: (data.registeredAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
        } as RegisteredDevice
    });
}

export async function approveDevice(pendingDeviceId: string, mode: 'replace' | 'add'): Promise<void> {
    const pendingDeviceRef = pendingDevicesCol.doc(pendingDeviceId);
    const pendingDeviceSnap = await pendingDeviceRef.get();
    
    if (!pendingDeviceSnap.exists) {
        throw new Error("Device not found in pending list.");
    }
    
    const deviceToApproveData = pendingDeviceSnap.data() as PendingDevice;

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
