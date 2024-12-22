import React from 'react';
import { useController, Control } from 'react-hook-form';
import { useGalleryStore } from '../../store/gallery';

interface AlbumAccessSelectProps {
  control: Control<any>;
  name: string;
}

export function AlbumAccessSelect({ control, name }: AlbumAccessSelectProps) {
  const albums = useGalleryStore((state) => state.albums);
  const { field } = useController({ name, control });

  const handleSelectAll = () => {
    field.onChange(albums.map(album => album.id));
  };

  const handleClearAll = () => {
    field.onChange([]);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Album Access
        </label>
        <div className="space-x-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-sm text-gray-600 hover:text-gray-500"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="border rounded-md p-4 space-y-2 max-h-48 overflow-y-auto">
        {albums.map((album) => (
          <label key={album.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={field.value?.includes(album.id)}
              onChange={(e) => {
                const newValue = e.target.checked
                  ? [...(field.value || []), album.id]
                  : field.value?.filter((id: string) => id !== album.id);
                field.onChange(newValue);
              }}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">{album.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}