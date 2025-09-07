

'use server';

import { collection, query, where, getDocs, addDoc, deleteDoc, doc, writeBatch, getDoc, updateDoc } from 'firebase/firestore';
import { adminDB } from '@/lib/firebase-admin';
import { rejectDeviceFlow } from '@/ai/flows/register-device';

// This is the new, more detailed structure for device info.
type DeviceInfo = {
    os?: string;
    browser?: string;
    deviceType?: string;
};

export type Device = {
  id: string;
  studentId: string;
  studentName: string;
  deviceId: string;
  ipAddress: string;
  deviceInfo?: DeviceInfo; // Now a nested object
  courses: string[];
};

export type PendingDevice = Device;
export type RegisteredDevice = Device;

const pendingDevicesCol = adminDB.collection('pendingDevices');
const registeredDevicesCol = adminDB.collection('registeredDevices');


export async function getPendingDevices(): Promise<PendingDevice[]> {
    const snapshot = await pendingDevicesCol.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PendingDevice));
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

export async function addPendingDevice(deviceData: Omit<PendingDevice, 'id'>): Promise<PendingDevice> {
    const q = pendingDevicesCol.where("deviceId", "==", deviceData.deviceId).where("studentId", "==", deviceData.studentId);
    const existingSnapshot = await q.get();
    if (!existingSnapshot.empty) {
        const existingDoc = existingSnapshot.docs[0];
        return { id: existingDoc.id, ...existingDoc.data() } as PendingDevice;
    }

    const docRef = await addDoc(pendingDevicesCol, deviceData);
    const newDocSnap = await getDoc(docRef);
    return { id: newDocSnap.id, ...newDocSnap.data() } as PendingDevice;
}

export async function approveDevice(pendingDeviceId: string, mode: 'replace' | 'add'): Promise<void> {
    const pendingDeviceRef = doc(adminDB, 'pendingDevices', pendingDeviceId);
    const pendingDeviceSnap = await getDoc(pendingDeviceRef);
    
    if (!pendingDeviceSnap.exists()) {
        throw new Error("Device not found in pending list.");
    }
    
    const deviceToApproveData = pendingDeviceSnap.data();
    const studentId = deviceToApproveData.studentId;

    const batch = writeBatch(adminDB);

    if (mode === 'replace') {
        const oldDevicesQuery = registeredDevicesCol.where("studentId", "==", studentId);
        const oldDevicesSnapshot = await oldDevicesQuery.get();
        oldDevicesSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
    }

    const newRegisteredDeviceRef = doc(registeredDevicesCol);
    batch.set(newRegisteredDeviceRef, deviceToApproveData);
    
    batch.delete(pendingDeviceRef);

    await batch.commit();
}

export async function rejectPendingDeviceService(pendingDeviceId: string): Promise<void> {
    await rejectDeviceFlow(pendingDeviceId);
}


export async function deleteRegisteredDevice(deviceId: string): Promise<void> {
    await deleteDoc(doc(adminDB, 'registeredDevices', deviceId));
}

export async function deleteRegisteredDeviceByStudentId(studentId: string): Promise<void> {
    const q = registeredDevicesCol.where("studentId", "==", studentId);
    const snapshot = await q.get();
    
    if (snapshot.empty) return;

    const batch = writeBatch(adminDB);
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
            await updateDoc(deviceDocRef, { 'deviceInfo.browser' : browser }); // Use dot notation for nested fields
        } else {
             // Also check pending devices
            const pendingQ = pendingDevicesCol.where('deviceId', '==', deviceId).where('studentId', '==', studentId);
            const pendingSnapshot = await pendingQ.get();
            if(!pendingSnapshot.empty) {
                 const deviceDocRef = pendingSnapshot.docs[0].ref;
                 await updateDoc(deviceDocRef, { 'deviceInfo.browser' : browser });
            }
        }
    } catch (error) {
        console.error("Error updating device browser info:", error);
    }
}
