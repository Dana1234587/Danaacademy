
'use server';

import { collection, query, where, getDocs, addDoc, deleteDoc, doc, writeBatch, getDoc } from 'firebase/firestore';
import { adminDB } from '@/lib/firebase-admin'; // Use Admin DB for backend operations

export type Device = {
  id: string;
  studentId: string;
  studentName: string;
  deviceId: string;
  ipAddress: string;
  deviceType: 'Desktop' | 'Mobile';
  os: string;
  courses: string[];
};

export type PendingDevice = Device;
export type RegisteredDevice = Device;

// We use adminDB for all server-side data fetching for the admin panel.
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
    // Check if a pending request for this exact device already exists to avoid duplicates
    const q = pendingDevicesCol.where("deviceId", "==", deviceData.deviceId).where("studentId", "==", deviceData.studentId);
    const existingSnapshot = await q.get();
    if (!existingSnapshot.empty) {
        // A request for this device already exists, so don't add another one.
        const existingDoc = existingSnapshot.docs[0];
        return { id: existingDoc.id, ...existingDoc.data() } as PendingDevice;
    }

    const docRef = await pendingDevicesCol.add(deviceData);
    const newDocSnap = await docRef.get();
    return { id: newDocSnap.id, ...newDocSnap.data() } as PendingDevice;
}

export async function approveDevice(pendingDeviceId: string, mode: 'replace' | 'add'): Promise<void> {
    const pendingDeviceRef = adminDB.collection('pendingDevices').doc(pendingDeviceId);
    const pendingDeviceSnap = await pendingDeviceRef.get();
    
    if (!pendingDeviceSnap.exists) {
        throw new Error("Device not found in pending list.");
    }
    
    const deviceToApproveData = pendingDeviceSnap.data()!;
    const studentId = deviceToApproveData.studentId;

    const batch = adminDB.batch();

    // If mode is 'replace', find and delete all existing registered devices for this student
    if (mode === 'replace') {
        const oldDevicesQuery = adminDB.collection('registeredDevices').where("studentId", "==", studentId);
        const oldDevicesSnapshot = await oldDevicesQuery.get();
        oldDevicesSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
    }

    // Add the new device to the registeredDevices collection
    const newRegisteredDeviceRef = adminDB.collection('registeredDevices').doc();
    batch.set(newRegisteredDeviceRef, deviceToApproveData);
    
    // Delete the device from the pendingDevices collection
    batch.delete(pendingDeviceRef);

    // Commit all operations atomically
    await batch.commit();
}


export async function deleteRegisteredDevice(deviceId: string): Promise<void> {
    await adminDB.collection('registeredDevices').doc(deviceId).delete();
}

export async function deleteRegisteredDeviceByStudentId(studentId: string): Promise<void> {
    const q = adminDB.collection('registeredDevices').where("studentId", "==", studentId);
    const snapshot = await q.get();
    
    if (snapshot.empty) return; // No devices to delete

    const batch = adminDB.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
}
