import { useState } from 'react';
import { Album } from '../../../../types';
import { useGalleryStore } from '../../../../store/gallery';

export function useAlbumDialog() {
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
      updateAlbum(editingAlbum.id, {
        ...data,
        updatedAt: new Date(),
      });
    } else {
      addAlbum({
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    closeDialog();
  };

  return {
    isOpen,
    editingAlbum,
    openDialog,
    closeDialog,
    handleSubmit,
  };
}