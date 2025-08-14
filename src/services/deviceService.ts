
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
  course: string;
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

export async function findRegisteredDeviceByStudentId(studentId: string): Promise<RegisteredDevice | undefined> {
    const q = query(registeredDevicesCol, where("studentId", "==", studentId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return undefined;
    }
    // A student should only have one registered device. If there are more, this returns the first one.
    // The approval logic will handle deleting old ones.
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as RegisteredDevice;
}

export async function addPendingDevice(deviceData: Omit<PendingDevice, 'id'>): Promise<PendingDevice> {
    // Check if a pending request for this exact device already exists to avoid duplicates
    const q = query(pendingDevicesCol, where("deviceId", "==", deviceData.deviceId));
    const existingSnapshot = await getDocs(q);
    if (!existingSnapshot.empty) {
        // A request for this device already exists, so don't add another one.
        const existingDoc = existingSnapshot.docs[0];
        return { id: existingDoc.id, ...existingDoc.data() } as PendingDevice;
    }

    const docRef = await addDoc(pendingDevicesCol, deviceData);
    return { id: docRef.id, ...deviceData };
}

export async function registerDevice(deviceData: Omit<RegisteredDevice, 'id'>): Promise<RegisteredDevice> {
    const docRef = await addDoc(registeredDevicesCol, deviceData);
    return { id: docRef.id, ...deviceData };
}


export async function approveDevice(pendingDeviceId: string): Promise<void> {
    const pendingDeviceRef = doc(db, 'pendingDevices', pendingDeviceId);
    const pendingDeviceSnap = await getDoc(pendingDeviceRef); // Use getDoc for single document
    
    if (!pendingDeviceSnap.exists()) {
        throw new Error("Device not found in pending list");
    }
    
    const deviceToApproveData = pendingDeviceSnap.data();
    
    // Remove any existing registered device for this student to ensure only one is active
    const q = query(registeredDevicesCol, where("studentId", "==", deviceToApproveData.studentId));
    const oldDevicesSnapshot = await getDocs(q);
    if(!oldDevicesSnapshot.empty){
        const batch = writeBatch(db);
        oldDevicesSnapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    }
    
    // Add the new device to registered devices
    await addDoc(registeredDevicesCol, deviceToApproveData);
    
    // Remove from pending devices
    await deleteDoc(pendingDeviceRef);
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
