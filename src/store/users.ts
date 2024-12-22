import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateUUID } from '../lib/utils/uuid';
import type { User, CreateUserInput, UpdateUserInput } from '../types/user';

interface UsersState {
  version: number;
  users: User[];
  addUser: (input: CreateUserInput) => User;
  updateUser: (id: string, input: UpdateUserInput) => User;
  deleteUser: (id: string) => void;
  getUser: (id: string) => User | undefined;
  getUserByPassword: (password: string) => User | undefined;
  resetUsers: () => void;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set, get) => ({
      version: 1,
      users: [],
      addUser: (input) => {
        if (get().users.some(user => user.password === input.password)) {
          throw new Error('Password must be unique');
        }

        const now = new Date().toISOString();
        const user: User = {
          id: generateUUID(),
          displayName: input.displayName,
          password: input.password,
          role: input.role || 'user',
          albumAccess: input.albumAccess || [],
          createdAt: now,
          updatedAt: now,
        };
        
        set((state) => ({ users: [...state.users, user] }));
        return user;
      },
      updateUser: (id, input) => {
        if (input.password) {
          const existingUser = get().users.find(user => 
            user.password === input.password && user.id !== id
          );
          if (existingUser) {
            throw new Error('Password must be unique');
          }
        }

        let updatedUser: User | undefined;
        set((state) => ({
          users: state.users.map((user) => {
            if (user.id === id) {
              updatedUser = {
                ...user,
                ...input,
                updatedAt: new Date().toISOString(),
              };
              return updatedUser;
            }
            return user;
          }),
        }));
        
        if (!updatedUser) {
          throw new Error('User not found');
        }
        return updatedUser;
      },
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }));
      },
      getUser: (id) => {
        return get().users.find((user) => user.id === id);
      },
      getUserByPassword: (password) => {
        return get().users.find((user) => user.password === password);
      },
      resetUsers: () => {
        set({
          users: [{
            id: generateUUID(),
            displayName: 'Administrator',
            password: 'admin123',
            role: 'admin',
            albumAccess: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }]
        });
      },
    }),
    {
      name: 'users-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            version: 1,
            users: [],
          };
        }
        return persistedState as UsersState;
      },
    }
  )
);

// Reset users when the store is created
useUsersStore.getState().resetUsers();