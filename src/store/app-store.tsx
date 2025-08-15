
'use client';

import { create, useStore as useZustandStore } from 'zustand';
import React, { createContext, useContext, useRef, type ReactNode, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Define types for our data
export type User = {
    uid: string;
    username: string;
    email: string;
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
      // If no user is logged in, set user to null and stop loading.
      if (!firebaseUser) {
        store.getState().logout();
        return;
      }

      // If a user is logged in, try to fetch their data.
      try {
        // First, check if the user is an admin.
        const adminDocRef = doc(db, 'admins', firebaseUser.uid);
        const adminDocSnap = await getDoc(adminDocRef);

        if (adminDocSnap.exists()) {
          const adminData = adminDocSnap.data();
          store.getState().setCurrentUser({ 
              uid: firebaseUser.uid,
              username: adminData.displayName || 'Admin',
              email: firebaseUser.email || '', 
              role: 'admin',
              enrolledCourseIds: ['tawjihi-2007-supplementary', 'tawjihi-2008'] 
          });
        } else {
          // If not an admin, check if they are a student.
          const studentDocRef = doc(db, 'students', firebaseUser.uid);
          const studentDocSnap = await getDoc(studentDocRef);

          if (studentDocSnap.exists()) {
             const studentData = studentDocSnap.data();
             store.getState().setCurrentUser({ 
                uid: firebaseUser.uid,
                username: studentData.studentName,
                email: firebaseUser.email || '',
                role: 'student', 
                enrolledCourseIds: studentData.courseIds || []
            });
          } else {
             // User is authenticated but has no data in our database.
             console.warn(`User ${firebaseUser.uid} authenticated but not found in Firestore collections.`);
             store.getState().logout();
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // If there's an error (e.g., permission denied), log the user out from the app state.
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
