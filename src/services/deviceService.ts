
'use server';

import { collection, query, where, getDocs, addDoc, deleteDoc, doc, writeBatch, getDoc, updateDoc } from 'firebase/firestore';
import { adminDB } from '@/lib/firebase-admin';

export type Device = {
  id: string;
  studentId: string;
  studentName: string;
  deviceId: string;
  ipAddress: string;
  deviceType: string;
  os: string;
  browser?: string;
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

    if (mode === 'replace') {
        const oldDevicesQuery = adminDB.collection('registeredDevices').where("studentId", "==", studentId);
        const oldDevicesSnapshot = await oldDevicesQuery.get();
        oldDevicesSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
    }

    const newRegisteredDeviceRef = adminDB.collection('registeredDevices').doc();
    batch.set(newRegisteredDeviceRef, deviceToApproveData);
    
    batch.delete(pendingDeviceRef);

    await batch.commit();
}


export async function deleteRegisteredDevice(deviceId: string): Promise<void> {
    await adminDB.collection('registeredDevices').doc(deviceId).delete();
}

export async function deleteRegisteredDeviceByStudentId(studentId: string): Promise<void> {
    const q = adminDB.collection('registeredDevices').where("studentId", "==", studentId);
    const snapshot = await q.get();
    
    if (snapshot.empty) return;

    const batch = adminDB.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
}

export async function updateDeviceBrowserInfo(deviceId: string, studentId: string, browserInfo: string): Promise<void> {
    try {
        const q = query(collection(adminDB, 'registeredDevices'), where('deviceId', '==', deviceId), where('studentId', '==', studentId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const deviceDocRef = querySnapshot.docs[0].ref;
            await updateDoc(deviceDocRef, { browser: browserInfo });
        }
    } catch (error) {
        console.error("Error updating device browser info:", error);
    }
}
