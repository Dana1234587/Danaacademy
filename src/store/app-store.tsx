'use client';

import { create, useStore as useZustandStore } from 'zustand';
import React, { createContext, useContext, useRef, type ReactNode } from 'react';

// Define types for our data
// Note: The actual data types are now in the services, but we keep them here for the User type.
type User = {
    username: string;
    role: 'admin' | 'student';
    enrolledCourseIds: string[];
}

// Define the state structure
export interface AppState {
  currentUser: User | null;
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
}

type AppStore = ReturnType<typeof createAppStore>;

// Create the store
const createAppStore = () => create<AppState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
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
