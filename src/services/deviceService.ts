import { collection, query, where, getDocs, addDoc, deleteDoc, doc, writeBatch, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

const pendingDevicesCol = collection(db, 'pendingDevices');
const registeredDevicesCol = collection(db, 'registeredDevices');


export async function getPendingDevices(): Promise<PendingDevice[]> {
    const snapshot = await getDocs(pendingDevicesCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PendingDevice));
}

export async function getRegisteredDevices(): Promise<RegisteredDevice[]> {
    const snapshot = await getDocs(registeredDevicesCol);
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

export async function addPendingDevice(deviceData: Omit<PendingDevice, 'id'>): Promise<PendingDevice> {
    // Check if a pending request for this exact device already exists to avoid duplicates
    const q = query(pendingDevicesCol, where("deviceId", "==", deviceData.deviceId), where("studentId", "==", deviceData.studentId));
    const existingSnapshot = await getDocs(q);
    if (!existingSnapshot.empty) {
        // A request for this device already exists, so don't add another one.
        const existingDoc = existingSnapshot.docs[0];
        return { id: existingDoc.id, ...existingDoc.data() } as PendingDevice;
    }

    const docRef = await addDoc(pendingDevicesCol, deviceData);
    return { id: docRef.id, ...deviceData };
}

export async function approveDevice(pendingDeviceId: string, mode: 'replace' | 'add'): Promise<void> {
    const pendingDeviceRef = doc(db, 'pendingDevices', pendingDeviceId);
    const pendingDeviceSnap = await getDoc(pendingDeviceRef);
    
    if (!pendingDeviceSnap.exists()) {
        throw new Error("Device not found in pending list.");
    }
    
    const deviceToApproveData = pendingDeviceSnap.data();
    const studentId = deviceToApproveData.studentId;

    const batch = writeBatch(db);

    // If mode is 'replace', find and delete all existing registered devices for this student
    if (mode === 'replace') {
        const oldDevicesQuery = query(registeredDevicesCol, where("studentId", "==", studentId));
        const oldDevicesSnapshot = await getDocs(oldDevicesQuery);
        oldDevicesSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
    }

    // Add the new device to the registeredDevices collection
    // We create a new doc reference for the new registered device
    const newRegisteredDeviceRef = doc(collection(db, 'registeredDevices'));
    batch.set(newRegisteredDeviceRef, deviceToApproveData);
    
    // Delete the device from the pendingDevices collection
    batch.delete(pendingDeviceRef);

    // Commit all operations atomically
    await batch.commit();
}


export async function deleteRegisteredDevice(deviceId: string): Promise<void> {
    const deviceRef = doc(db, 'registeredDevices', deviceId);
    await deleteDoc(deviceRef);
}

export async function deleteRegisteredDeviceByStudentId(studentId: string): Promise<void> {
    const q = query(registeredDevicesCol, where("studentId", "==", studentId));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return; // No devices to delete

    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
}
