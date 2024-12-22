import React, { createContext, useState, useContext } from 'react';
import { useGalleryStore } from '../store/gallery';
import type { Album } from '../types';

interface AlbumDialogContextType {
  isOpen: boolean;
  editingAlbum: Album | null;
  openDialog: (album?: Album) => void;
  closeDialog: () => void;
  handleSubmit: (data: { name: string; description: string }) => void;
}

const AlbumDialogContext = createContext<AlbumDialogContextType | null>(null);

export function AlbumDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const addAlbum = useGalleryStore((state) => state.addAlbum);
  const updateAlbum = useGalleryStore((state) => state.updateAlbum);

  const openDialog = (album?: Album) => {
    setEditingAlbum(album || null);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setEditingAlbum(null);
    setIsOpen(false);
  };

  const handleSubmit = (data: { name: string; description: string }) => {
    if (editingAlbum) {
      updateAlbum(editingAlbum.id, data);
    } else {
      addAlbum(data);
    }
    closeDialog();
  };

  return (
    <AlbumDialogContext.Provider
      value={{ isOpen, editingAlbum, openDialog, closeDialog, handleSubmit }}
    >
      {children}
    </AlbumDialogContext.Provider>
  );
}

export function useAlbumDialog() {
  const context = useContext(AlbumDialogContext);
  if (!context) {
    throw new Error('useAlbumDialog must be used within an AlbumDialogProvider');
  }
  return context;
}
