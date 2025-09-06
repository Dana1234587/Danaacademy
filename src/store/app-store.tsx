
'use client';

import { create, useStore as useZustandStore } from 'zustand';
import React, { createContext, useContext, useRef, type ReactNode, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { updateDeviceBrowserInfo } from '@/services/deviceService';


// Define types for our data
export type User = {
    uid: string;
    username: string;
    email: string;
    role: 'admin' | 'student';
    enrolledCourseIds: string[];
    gender?: 'male' | 'female';
}

// Define the state structure
export interface AppState {
  currentUser: User | null;
  isLoading: boolean;
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

type AppStore = ReturnType<typeof createAppStore>;

// Helper functions to get device info, moved here for broader access
const getDeviceId = (): string => {
  const DANA_ACADEMY_DEVICE_ID = 'DANA_ACADEMY_DEVICE_ID';
  let deviceId = localStorage.getItem(DANA_ACADEMY_DEVICE_ID);

  if (!deviceId) {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    let renderer = '';
    if (gl && 'getParameter' in gl && 'RENDERER' in gl) {
        renderer = gl.getParameter(gl.RENDERER);
    }
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const random = Math.random().toString(36).substring(2);
    deviceId = `${userAgent}-${platform}-${renderer}-${random}`;
    let hash = 0;
    for (let i = 0; i < deviceId.length; i++) {
        const char = deviceId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    deviceId = `dana-device-${hash.toString(16)}`;
    localStorage.setItem(DANA_ACADEMY_DEVICE_ID, deviceId);
  }
  return deviceId;
};

const getOSAndBrowserInfo = () => {
    const userAgent = window.navigator.userAgent;
    let os = "Unknown OS";
    let deviceType = "Desktop";
    let browser = "Unknown Browser";

    if (/android/i.test(userAgent)) { os = "Android"; deviceType = "Mobile"; }
    else if (/iPad|iPhone|iPod/.test(userAgent)) { os = "iOS"; deviceType = "Mobile"; }
    else if (/Win/i.test(userAgent)) { os = "Windows"; }
    else if (/Mac/i.test(userAgent)) { os = "macOS"; }
    else if (/Linux/i.test(userAgent)) { os = "Linux"; }

    if ((/Chrome|CriOS/i).test(userAgent) && !(/Edge|Edg/i).test(userAgent)) {
        const match = userAgent.match(/(Chrome|CriOS)\/([0-9\.]+)/);
        browser = match ? `Chrome ${match[2]}` : "Chrome";
    } else if ((/Firefox|FxiOS/i).test(userAgent)) {
        const match = userAgent.match(/(Firefox|FxiOS)\/([0-9\.]+)/);
        browser = match ? `Firefox ${match[2]}` : "Firefox";
    } else if ((/Safari/i).test(userAgent) && !(/Chrome|CriOS/i).test(userAgent)) {
        const match = userAgent.match(/Version\/([0-9\.]+) Safari/);
        browser = match ? `Safari ${match[1]}` : "Safari";
    } else if ((/Edge|Edg/i).test(userAgent)) {
        const match = userAgent.match(/(Edge|Edg)\/([0-9\.]+)/);
        browser = match ? `Edge ${match[2]}` : "Edge";
    } else if ((/MSIE|Trident/i).test(userAgent)) {
        browser = "Internet Explorer";
    }
    return { os, deviceType, browser };
};


// Create the store
const createAppStore = () => create<AppState>((set) => ({
  currentUser: null,
  isLoading: true,
  setCurrentUser: (user) => set({ currentUser: user, isLoading: false }),
  logout: () => set({ currentUser: null, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// Provider and hook for easy consumption in client components
const AppStoreContext = createContext<AppStore | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = createAppStore();
  }
  
  // Centralized auth state listener
  useEffect(() => {
    const store = storeRef.current!;
    store.getState().setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (!firebaseUser) {
        store.getState().logout();
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear cookie on logout
        return;
      }
      
      const token = await firebaseUser.getIdToken();
      // Set session cookie
      document.cookie = `session=${token}; path=/; max-age=3600`; // Expires in 1 hour

      try {
        // Attempt to fetch from both collections simultaneously
        const [adminDocSnap, studentDocSnap] = await Promise.all([
          getDoc(doc(db, 'admins', firebaseUser.uid)),
          getDoc(doc(db, 'students', firebaseUser.uid))
        ]);
        
        let user: User | null = null;
        if (adminDocSnap.exists()) {
           const adminData = adminDocSnap.data();
           user = { 
              uid: firebaseUser.uid,
              username: 'Admin', // Admin username can be static or from doc
              email: firebaseUser.email || '', 
              role: 'admin',
              // Admins have access to all courses by default in the UI logic
              enrolledCourseIds: ['tawjihi-2007-supplementary', 'tawjihi-2008-first-semester', 'tawjihi-2008-foundation'] 
          };
        } else if (studentDocSnap.exists()) {
             const studentData = studentDocSnap.data();
             user = { 
                uid: firebaseUser.uid,
                username: studentData.studentName,
                email: firebaseUser.email || '',
                role: 'student', 
                enrolledCourseIds: studentData.courseIds || [],
                gender: studentData.gender
            };
        }
        
        if (user) {
          store.getState().setCurrentUser(user);
          // On every page load for a logged-in student, update their browser info
          if (user.role === 'student') {
            const deviceId = getDeviceId();
            const { browser } = getOSAndBrowserInfo();
            // Fire-and-forget update
            updateDeviceBrowserInfo(deviceId, user.uid, browser);
          }
        } else {
             console.warn(`User ${firebaseUser.uid} not found in 'admins' or 'students' collection.`);
             store.getState().logout();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        store.getState().logout();
      }
    });

    return () => unsubscribe();
  }, []);

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
