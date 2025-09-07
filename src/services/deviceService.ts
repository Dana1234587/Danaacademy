
'use server';

import { adminDB } from '@/lib/firebase-admin';

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
};

export type PendingDevice = Omit<Device, 'id'>;
export type RegisteredDevice = Device;

const pendingDevicesCol = adminDB.collection('pendingDevices');
const registeredDevicesCol = adminDB.collection('registeredDevices');

export async function addDeviceToPending(deviceData: PendingDevice): Promise<void> {
    await pendingDevicesCol.add(deviceData);
}

export async function addDeviceToRegistered(deviceData: PendingDevice): Promise<void> {
    await registeredDevicesCol.add(deviceData);
}

export async function getPendingDevices(): Promise<(PendingDevice & {id: string})[]> {
    const snapshot = await pendingDevicesCol.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PendingDevice & {id: string}));
}

export async function getRegisteredDevices(): Promise<RegisteredDevice[]> {
    const snapshot = await registeredDevicesCol.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RegisteredDevice));
}

export async function findRegisteredDevicesByStudentId(studentId: string): Promise<RegisteredDevice[]> {
    const q = registeredDevicesCol.where("studentId", "==", studentId);
    const snapshot = await q.get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RegisteredDevice));
}

export async function approveDevice(pendingDeviceId: string, mode: 'replace' | 'add'): Promise<void> {
    const pendingDeviceRef = pendingDevicesCol.doc(pendingDeviceId);
    const pendingDeviceSnap = await pendingDeviceRef.get();
    
    if (!pendingDeviceSnap.exists) {
        throw new Error("Device not found in pending list.");
    }
    
    const deviceToApproveData = pendingDeviceSnap.data();
    if (!deviceToApproveData) {
        throw new Error("Pending device data is empty.");
    }
    const studentId = deviceToApproveData.studentId;

    const batch = adminDB.batch();

    if (mode === 'replace') {
        const oldDevicesQuery = registeredDevicesCol.where("studentId", "==", studentId);
        const oldDevicesSnapshot = await oldDevicesQuery.get();
        oldDevicesSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
    }
    
    // Create a new document in the registeredDevices collection with the full data
    const newRegisteredDeviceRef = registeredDevicesCol.doc();
    batch.set(newRegisteredDeviceRef, deviceToApproveData);
    
    // Delete the original document from the pendingDevices collection
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
