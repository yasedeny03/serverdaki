import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  version: number;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      version: 1, // Add version control
      logoUrl: '/vv-jewellery-logo.png',
      setLogoUrl: (url: string) => set({ logoUrl: url }),
    }),
    {
      name: 'settings-storage',
      version: 1, // Specify current version
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Handle migration from version 0 to 1
          return {
            version: 1,
            logoUrl: persistedState.logoUrl || '/vv-jewellery-logo.png',
          };
        }
        return persistedState as SettingsState;
      },
    }
  )
);
