import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUsersStore } from './users';
import type { User } from '../types/user';

interface AuthState {
  version: number;
  user: User | null;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      version: 1,
      user: null,
      login: async (password: string) => {
        const user = useUsersStore.getState().getUserByPassword(password);
        if (!user) {
          throw new Error('Invalid password');
        }
        set({ user });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            version: 1,
            user: persistedState.user || null,
          };
        }
        return persistedState as AuthState;
      },
    }
  )
);