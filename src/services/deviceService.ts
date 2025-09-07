

'use server';

import { collection, query, where, getDocs, addDoc, deleteDoc, doc, writeBatch, getDoc, updateDoc } from 'firebase/firestore';
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
    const q = query(registeredDevicesCol, where("studentId", "==", studentId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RegisteredDevice));
}


export async function approveDevice(pendingDeviceId: string, mode: 'replace' | 'add'): Promise<void> {
    const pendingDeviceRef = doc(adminDB, 'pendingDevices', pendingDeviceId);
    const pendingDeviceSnap = await getDoc(pendingDeviceRef);
    
    if (!pendingDeviceSnap.exists()) {
        throw new Error("Device not found in pending list.");
    }
    
    // Correctly copy the full data object, including the nested deviceInfo
    const deviceToApproveData = pendingDeviceSnap.data();
    if (!deviceToApproveData) {
        throw new Error("Pending device data is empty.");
    }
    const studentId = deviceToApproveData.studentId;

    const batch = writeBatch(adminDB);

    if (mode === 'replace') {
        const oldDevicesQuery = query(registeredDevicesCol, where("studentId", "==", studentId));
        const oldDevicesSnapshot = await getDocs(oldDevicesQuery);
        oldDevicesSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
    }
    
    const newRegisteredDeviceRef = doc(collection(adminDB, 'registeredDevices'));
    // Use the full data object from the pending device
    batch.set(newRegisteredDeviceRef, deviceToApproveData);
    
    batch.delete(pendingDeviceRef);

    await batch.commit();
}


export async function rejectPendingDevice(pendingDeviceId: string): Promise<void> {
    const pendingDeviceRef = doc(adminDB, 'pendingDevices', pendingDeviceId);
    await deleteDoc(pendingDeviceRef);
}


export async function deleteRegisteredDevice(deviceId: string): Promise<void> {
    await deleteDoc(doc(adminDB, 'registeredDevices', deviceId));
}

export async function deleteRegisteredDeviceByStudentId(studentId: string): Promise<void> {
    const q = query(registeredDevicesCol, where("studentId", "==", studentId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return;

    const batch = writeBatch(adminDB);
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
}

export async function updateDeviceBrowserInfo(deviceId: string, studentId: string, browser: string): Promise<void> {
    try {
        const q = query(registeredDevicesCol, where('deviceId', '==', deviceId), where('studentId', '==', studentId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const deviceDocRef = querySnapshot.docs[0].ref;
            await updateDoc(deviceDocRef, { 'deviceInfo.browser' : browser }); // Use dot notation for nested fields
        } else {
             // Also check pending devices
            const pendingQ = query(pendingDevicesCol, where('deviceId', '==', deviceId), where('studentId', '==', studentId));
            const pendingSnapshot = await getDocs(pendingQ);
            if(!pendingSnapshot.empty) {
                 const deviceDocRef = pendingSnapshot.docs[0].ref;
                 await updateDoc(deviceDocRef, { 'deviceInfo.browser' : browser });
            }
        }
    } catch (error) {
        console.error("Error updating device browser info:", error);
    }
}
