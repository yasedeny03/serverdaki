import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AlbumList } from './AlbumList';
import { AdminAlbumView } from './AdminAlbumView';
import { AlbumDialog } from './AlbumDialog';
import { AlbumHeader } from './AlbumHeader';
import { useAlbumDialog } from '../../../../contexts/AlbumDialogContext';

export function AlbumManager() {
  const { isOpen, editingAlbum, closeDialog, handleSubmit } = useAlbumDialog();

  return (
    <div className="space-y-6">
      <Routes>
        <Route 
          index 
          element={
            <>
              <AlbumHeader />
              <AlbumList />
            </>
          } 
        />
        <Route 
          path=":albumId" 
          element={<AdminAlbumView />} 
        />
      </Routes>

      <AlbumDialog
        isOpen={isOpen}
        onClose={closeDialog}
        onSubmit={handleSubmit}
        initialData={editingAlbum ? {
          name: editingAlbum.name,
          description: editingAlbum.description,
        } : undefined}
      />
    </div>
  );
}