
'use client';

import { create, useStore as useZustandStore } from 'zustand';
import React, { createContext, useContext, useRef, type ReactNode, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { findStudentByUsername } from '@/services/studentService';

// Define types for our data
type User = {
    uid: string;
    username: string;
    email: string; // Add email to the user type
    role: 'admin' | 'student';
    enrolledCourseIds: string[];
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
      if (firebaseUser && firebaseUser.email) {
        if (firebaseUser.email.startsWith('admin')) {
          store.getState().setCurrentUser({ 
              uid: firebaseUser.uid,
              username: 'admin',
              email: firebaseUser.email, 
              role: 'admin', 
              enrolledCourseIds: ['tawjihi-2007-supplementary', 'tawjihi-2008'] 
          });
        } else {
          const student = await findStudentByUsername(firebaseUser.email.split('@')[0]);
          if (student) {
            store.getState().setCurrentUser({ 
                uid: student.id,
                username: student.studentName,
                email: firebaseUser.email,
                role: 'student', 
                enrolledCourseIds: student.courseIds 
            });
          } else {
            // Student data not found in Firestore, treat as logged out
            store.getState().logout();
          }
        }
      } else {
        // No user, clear the state
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
