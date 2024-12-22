import { api } from './client';
import type { Album } from '../../types';

export const albumsApi = {
  getAll: async () => {
    const { data } = await api.get<Album[]>('/albums');
    return data;
  },

  create: async (album: Omit<Album, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await api.post<Album>('/albums', album);
    return data;
  },

  update: async (id: string, album: Partial<Album>) => {
    const { data } = await api.put<Album>(`/albums/${id}`, album);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/albums/${id}`);
  },
};