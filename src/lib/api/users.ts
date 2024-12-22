import { api } from './client';
import type { User } from '../../types/user';

export const usersApi = {
  login: async (password: string) => {
    const { data } = await api.post<User>('/users/login', { password });
    return data;
  },

  getAll: async () => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  create: async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await api.post<User>('/users', user);
    return data;
  },

  update: async (id: string, user: Partial<User>) => {
    const { data } = await api.put<User>(`/users/${id}`, user);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/users/${id}`);
  },
};