

'use client';

import { create, useStore as useZustandStore } from 'zustand';
import React, { createContext, useContext, useRef, type ReactNode, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import UAParser from 'ua-parser-js';


// Define types for our data
export type User = {
  uid: string;
  username: string;
  email: string;
  role: 'admin' | 'student' | 'free_member';
  enrolledCourseIds: string[];
  gender?: 'male' | 'female';
  photoURL?: string;
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
        // Attempt to fetch from all three collections simultaneously
        const [adminDocSnap, studentDocSnap, freeMemberDocSnap] = await Promise.all([
          getDoc(doc(db, 'admins', firebaseUser.uid)),
          getDoc(doc(db, 'students', firebaseUser.uid)),
          getDoc(doc(db, 'free_members', firebaseUser.uid))
        ]);

        let user: User | null = null;
        if (adminDocSnap.exists()) {
          const adminData = adminDocSnap.data();
          user = {
            uid: firebaseUser.uid,
            username: 'Admin', // Admin username can be static or from doc
            email: firebaseUser.email || '',
            role: 'admin',
            // Admins have access to all courses by default
            enrolledCourseIds: [
              'tawjihi-2007-supplementary',
              'tawjihi-2008-first-semester',
              'tawjihi-2008-foundation',
              'tawjihi-2008-palestine',
              'astrophysics',
              'physics-101'
            ]
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
        } else if (freeMemberDocSnap.exists()) {
          const freeMemberData = freeMemberDocSnap.data();
          user = {
            uid: firebaseUser.uid,
            username: freeMemberData.displayName || firebaseUser.displayName || 'عضو مجاني',
            email: firebaseUser.email || '',
            role: 'free_member',
            enrolledCourseIds: [],
            photoURL: freeMemberData.photoURL || firebaseUser.photoURL || undefined
          };
        }

        if (user) {
          store.getState().setCurrentUser(user);
        } else {
          console.warn(`User ${firebaseUser.uid} not found in 'admins', 'students', or 'free_members' collection.`);
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
