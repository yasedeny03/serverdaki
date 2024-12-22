// src/lib/api/images.ts
import { api } from './client';
import type { Image } from '../../types';

export const imagesApi = {
  upload: async (file: File, albumId: string) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await api.post<{ imageUrl: string, thumbnailUrl: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
     return data;
  },

  getByAlbum: async (albumId: string) => {
    const { data } = await api.get<Image[]>(`/images/album/${albumId}`);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/images/${id}`);
  },
};
