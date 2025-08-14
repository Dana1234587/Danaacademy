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


// Mock data
let pendingDevices: PendingDevice[] = [
    { id: 'p1', studentId: 's1', studentName: 'أحمد علي', deviceId: 'a1b2-c3d4-e5f6', ipAddress: '82.114.120.50', deviceType: 'Desktop', os: 'Windows 10', course: 'فيزياء تكميلي 2007' },
    { id: 'p2', studentId: 's2', studentName: 'فاطمة محمد', deviceId: 'g7h8-i9j0-k1l2', ipAddress: '95.211.80.15', deviceType: 'Mobile', os: 'Android 13', course: 'فيزياء توجيهي 2008' },
];

let registeredDevices: RegisteredDevice[] = [
    { id: 'd1', studentId: 's3', studentName: 'خالد يوسف', deviceId: 'z9y8-x7w6-v5u4', ipAddress: '192.168.1.10', deviceType: 'Desktop', os: 'macOS', course: 'فيزياء توجيهي 2008' },
];

export async function getPendingDevices(): Promise<PendingDevice[]> {
    return Promise.resolve(pendingDevices);
}

export async function getRegisteredDevices(): Promise<RegisteredDevice[]> {
    return Promise.resolve(registeredDevices);
}

export async function findRegisteredDeviceByStudentId(studentId: string): Promise<RegisteredDevice | undefined> {
    return Promise.resolve(registeredDevices.find(d => d.studentId === studentId));
}

export async function addPendingDevice(deviceData: Omit<PendingDevice, 'id'>): Promise<PendingDevice> {
    const newDevice: PendingDevice = {
        id: `p${pendingDevices.length + 1}`,
        ...deviceData
    };
    pendingDevices.push(newDevice);
    return Promise.resolve(newDevice);
}

export async function registerDevice(deviceData: Omit<RegisteredDevice, 'id'>): Promise<RegisteredDevice> {
    const newDevice: RegisteredDevice = {
        id: `d${registeredDevices.length + 1}`,
        ...deviceData
    };
    registeredDevices.push(newDevice);
    return Promise.resolve(newDevice);
}


export async function approveDevice(pendingDeviceId: string): Promise<void> {
    const deviceToApprove = pendingDevices.find(d => d.id === pendingDeviceId);
    if (!deviceToApprove) {
        throw new Error("Device not found");
    }

    const newRegisteredDevice: RegisteredDevice = {
        ...deviceToApprove,
        id: `d${registeredDevices.length + 1}`, // new ID for registered list
    };

    // Remove from pending
    pendingDevices = pendingDevices.filter(d => d.id !== pendingDeviceId);
    // Remove any existing device for this student and add the new one
    registeredDevices = [
        ...registeredDevices.filter(d => d.studentId !== deviceToApprove.studentId),
        newRegisteredDevice
    ];
    
    return Promise.resolve();
}
