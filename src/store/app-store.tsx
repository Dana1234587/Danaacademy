'use client';

import { create, useStore as useZustandStore } from 'zustand';
import { students as initialStudents } from '@/lib/students';
import React, { createContext, useContext, useRef, type ReactNode } from 'react';

// Define types for our data
type Student = {
  id: string;
  studentName: string;
  username: string;
  password: string;
  course: string;
  courseId: string;
};

type Device = {
  id: string;
  studentId: string;
  studentName: string;
  deviceId: string;
  ipAddress: string;
  deviceType: 'Desktop' | 'Mobile';
  course: string;
};

type PendingDevice = Device;
type RegisteredDevice = Device;

type User = {
    username: string;
    role: 'admin' | 'student';
    enrolledCourseIds: string[];
}

// Define the state structure
export interface AppState {
  students: Student[];
  pendingDevices: PendingDevice[];
  registeredDevices: RegisteredDevice[];
  currentUser: User | null;
  
  // Actions
  addStudent: (student: Student) => void;
  addPendingDevice: (device: PendingDevice) => void;
  registerDevice: (device: RegisteredDevice) => void;
  approveDevice: (pendingDeviceId: string) => void;
  setCurrentUser: (user: User | null) => void;
}

type AppStore = ReturnType<typeof createAppStore>;

// Create the store
const createAppStore = () => create<AppState>((set) => ({
  students: initialStudents,
  pendingDevices: [
    { id: 'p1', studentId: 's1', studentName: 'أحمد علي', deviceId: 'a1b2-c3d4-e5f6', ipAddress: '82.114.120.50', deviceType: 'Desktop', course: 'فيزياء تكميلي 2007' },
    { id: 'p2', studentId: 's2', studentName: 'فاطمة محمد', deviceId: 'g7h8-i9j0-k1l2', ipAddress: '95.211.80.15', deviceType: 'Mobile', course: 'فيزياء توجيهي 2008' },
  ],
  registeredDevices: [
    { id: 'd1', studentId: 's3', studentName: 'خالد يوسف', deviceId: 'z9y8-x7w6-v5u4', ipAddress: '192.168.1.10', deviceType: 'Desktop', course: 'فيزياء توجيهي 2008' },
  ],
  currentUser: null,

  addStudent: (student) => set((state) => ({
    students: [...state.students, student],
  })),

  addPendingDevice: (device) => set((state) => ({
    pendingDevices: [...state.pendingDevices, device],
  })),

  registerDevice: (device) => set(state => ({
      registeredDevices: [...state.registeredDevices, device]
  })),

  approveDevice: (pendingDeviceId) => set((state) => {
    const deviceToApprove = state.pendingDevices.find(d => d.id === pendingDeviceId);
    if (!deviceToApprove) return state;

    const newRegisteredDevice: RegisteredDevice = {
      ...deviceToApprove,
      id: `d${state.registeredDevices.length + 1}`, // new ID for registered list
    };
    
    return {
      pendingDevices: state.pendingDevices.filter(d => d.id !== pendingDeviceId),
      // Remove any existing device for this student and add the new one
      registeredDevices: [
          ...state.registeredDevices.filter(d => d.studentId !== deviceToApprove.studentId), 
          newRegisteredDevice
      ],
    };
  }),

  setCurrentUser: (user) => set({ currentUser: user }),
}));

// Provider and hook for easy consumption in client components
const AppStoreContext = createContext<AppStore | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = createAppStore();
  }
  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export function useStore<T>(selector: (state: AppState) => T): T {
  const store = useContext(AppStoreContext);
  if (!store) {
    throw new Error('useStore must be used within an AppProvider');
  }
  return useZustandStore(store, selector);
}

// Deprecated: This hook might cause issues with multiple store instances.
// It's better to use the `useStore` hook with a selector.
export const useAppStore = () => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context();
};
