import React from 'react';
import { Trash2, FolderPlus } from 'lucide-react';
import { useGalleryStore } from '../../../../store/gallery';
import { useAlbumDialog } from '../../../../contexts/AlbumDialogContext';

interface ImageBulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClear: () => void;
  onMoveToAlbum: (albumId: string) => void;
}

export function ImageBulkActions({ 
  selectedCount, 
  totalCount,
  onSelectAll, 
  onClear,
  onMoveToAlbum 
}: ImageBulkActionsProps) {
  const albums = useGalleryStore((state) => state.albums);
  const [showAlbumDropdown, setShowAlbumDropdown] = React.useState(false);

  return (
    <div className="flex items-center justify-between bg-indigo-50 px-4 py-3 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-indigo-700">
          {selectedCount} of {totalCount} images selected
        </span>
        <button
          onClick={selectedCount === totalCount ? onClear : onSelectAll}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {selectedCount === totalCount ? 'Clear selection' : 'Select all'}
        </button>
      </div>
      
      <div className="flex gap-2">
        <div className="relative">
          <button 
            onClick={() => setShowAlbumDropdown(!showAlbumDropdown)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md text-indigo-700 hover:bg-indigo-100"
          >
            <FolderPlus className="h-4 w-4" />
            Move to Album
          </button>
          
          {showAlbumDropdown && (
            <>
              <div 
                className="fixed inset-0" 
                onClick={() => setShowAlbumDropdown(false)}
              />
              <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {albums.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No albums available
                    </div>
                  ) : (
                    albums.map((album) => (
                      <button
                        key={album.id}
                        onClick={() => {
                          onMoveToAlbum(album.id);
                          setShowAlbumDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {album.name}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        
        <button className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md text-red-700 hover:bg-red-100">
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
}