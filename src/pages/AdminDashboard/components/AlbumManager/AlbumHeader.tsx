import React from 'react';
import { FolderPlus } from 'lucide-react';
import { useAlbumDialog } from '../../../../contexts/AlbumDialogContext';

export function AlbumHeader() {
  const { openDialog } = useAlbumDialog();

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Albums</h1>
        <p className="mt-1 text-sm text-gray-500">
          Organize your images into collections
        </p>
      </div>
      <button
        onClick={() => openDialog()}
        className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <FolderPlus className="h-5 w-5" />
        New Album
      </button>
    </div>
  );
}