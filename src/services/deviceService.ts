
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
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
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as RegisteredDevice;
}

export async function addPendingDevice(deviceData: Omit<PendingDevice, 'id'>): Promise<PendingDevice> {
    const docRef = await addDoc(pendingDevicesCol, deviceData);
    return { id: docRef.id, ...deviceData };
}

export async function registerDevice(deviceData: Omit<RegisteredDevice, 'id'>): Promise<RegisteredDevice> {
    const docRef = await addDoc(registeredDevicesCol, deviceData);
    return { id: docRef.id, ...deviceData };
}


export async function approveDevice(pendingDeviceId: string): Promise<void> {
    const pendingDeviceRef = doc(db, 'pendingDevices', pendingDeviceId);
    const pendingDeviceSnap = await getDocs(query(pendingDevicesCol, where('__name__', '==', pendingDeviceId)));
    
    if (pendingDeviceSnap.empty) {
        throw new Error("Device not found in pending list");
    }
    
    const deviceToApprove = { id: pendingDeviceSnap.docs[0].id, ...pendingDeviceSnap.docs[0].data() } as PendingDevice;

    // Remove any existing registered device for this student
    const existingDevice = await findRegisteredDeviceByStudentId(deviceToApprove.studentId);
    if(existingDevice) {
        await deleteDoc(doc(db, 'registeredDevices', existingDevice.id));
    }

    // Add the new device to registered devices
    const { id, ...deviceData } = deviceToApprove;
    await addDoc(registeredDevicesCol, deviceData);
    
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
    
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    
    await batch.commit();
}
