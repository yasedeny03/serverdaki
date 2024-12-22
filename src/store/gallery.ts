import { create } from 'zustand';
import { albumsApi } from '../lib/api/albums';
import { imagesApi } from '../lib/api/images';
import type { Album, Image } from '../types';

interface GalleryState {
  albums: Album[];
  images: Image[];
  selectedAlbum: Album | null;
  gridColumns: 2 | 3 | 4;
  sortBy: 'date' | 'name' | 'custom';
  isLoading: boolean;
  error: string | null;

  // Actions
  setGridColumns: (columns: 2 | 3 | 4) => void;
  setSortBy: (sort: 'date' | 'name' | 'custom') => void;
  fetchAlbums: () => Promise<void>;
  fetchAlbumImages: (albumId: string) => Promise<void>;
  addAlbum: (album: Omit<Album, 'id'>) => Promise<void>;
  updateAlbum: (id: string, data: Partial<Album>) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  uploadImages: (files: File[], albumId: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  reorderImages: (albumId: string, orderedIds: string[]) => Promise<void>;
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  albums: [],
  images: [],
  selectedAlbum: null,
  gridColumns: 3,
  sortBy: 'date',
  isLoading: false,
  error: null,

  setGridColumns: (columns) => set({ gridColumns: columns }),
  setSortBy: (sort) => set({ sortBy: sort }),

  fetchAlbums: async () => {
    try {
      set({ isLoading: true, error: null });
      const albums = await albumsApi.getAll();
      set({ albums, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch albums', isLoading: false });
    }
  },

  fetchAlbumImages: async (albumId) => {
    try {
      const images = await imagesApi.getByAlbum(albumId);
      set((state) => ({
        images: [...state.images.filter(img => img.albumId !== albumId), ...images]
      }));
    } catch (error) {
      set({ error: 'Failed to fetch images' });
    }
  },

  addAlbum: async (albumData) => {
    try {
      const album = await albumsApi.create(albumData);
      set((state) => ({ albums: [...state.albums, album] }));
    } catch (error) {
      set({ error: 'Failed to create album' });
    }
  },

  updateAlbum: async (id, data) => {
    try {
      const album = await albumsApi.update(id, data);
      set((state) => ({
        albums: state.albums.map((a) => (a._id === id ? album : a))
      }));
    } catch (error) {
      set({ error: 'Failed to update album' });
    }
  },

  deleteAlbum: async (id) => {
    try {
      await albumsApi.delete(id);
      set((state) => ({
        albums: state.albums.filter((a) => a._id !== id),
        images: state.images.filter((img) => img.albumId !== id)
      }));
    } catch (error) {
      set({ error: 'Failed to delete album' });
    }
  },

  uploadImages: async (files, albumId) => {
    try {
      const uploads = files.map(file => imagesApi.upload(file, albumId));
      const newImages = await Promise.all(uploads);
        set((state) => ({ images: [...state.images, ...newImages] }));
    } catch (error) {
      set({ error: 'Failed to upload images' });
    }
  },

  deleteImage: async (id) => {
    try {
      await imagesApi.delete(id);
      set((state) => ({
        images: state.images.filter((img) => img.id !== id)
      }));
    } catch (error) {
      set({ error: 'Failed to delete image' });
    }
  },

  reorderImages: async (albumId, orderedIds) => {
    try {
      // Update local state immediately for optimistic UI
      set((state) => ({
        images: state.images.map((img) => ({
          ...img,
          order: orderedIds.indexOf(img.id)
        }))
      }));
      // Backend update would go here if needed
    } catch (error) {
      set({ error: 'Failed to reorder images' });
    }
  },
}));
