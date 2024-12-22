import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { ImageList } from './ImageList';
import { ImageBulkActions } from './ImageBulkActions';
import { useGalleryStore } from '../../../../store/gallery';

export function ImageManager() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { images, updateImage } = useGalleryStore();

  const handleSelectAll = () => {
    setSelectedImages(images.map(img => img.id));
  };

  const handleClear = () => {
    setSelectedImages([]);
  };

  const handleMoveToAlbum = (albumId: string) => {
    selectedImages.forEach(imageId => {
      updateImage(imageId, { albumId });
    });
    handleClear();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Image Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload, organize, and manage your gallery images
          </p>
        </div>
        <ImageUploader />
      </div>

      {images.length > 0 && (
        <ImageBulkActions
          selectedCount={selectedImages.length}
          totalCount={images.length}
          onSelectAll={handleSelectAll}
          onClear={handleClear}
          onMoveToAlbum={handleMoveToAlbum}
        />
      )}

      <ImageList
        images={images}
        selectedImages={selectedImages}
        onSelectionChange={setSelectedImages}
      />
    </div>
  );
}