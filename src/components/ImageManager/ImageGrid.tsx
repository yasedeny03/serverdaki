import React, { useState } from 'react';
import { Image } from '../../types';
import { ImageCard } from './ImageCard';
import { ImageBulkActions } from './ImageBulkActions';
import { useGalleryStore } from '../../store/gallery';

interface ImageGridProps {
  images: Image[];
  onImageClick: (index: number) => void;
}

export function ImageGrid({ images, onImageClick }: ImageGridProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const deleteImage = useGalleryStore((state) => state.deleteImage);

  const handleSelectAll = () => {
    setSelectedImages(images.map(img => img.id));
  };

  const handleClearSelection = () => {
    setSelectedImages([]);
  };

  const handleDeleteSelected = () => {
    if (confirm('Are you sure you want to delete the selected images?')) {
      selectedImages.forEach(id => deleteImage(id));
      setSelectedImages([]);
    }
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id) 
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <ImageBulkActions
          selectedCount={selectedImages.length}
          totalCount={images.length}
          onSelectAll={handleSelectAll}
          onClearSelection={handleClearSelection}
          onDelete={handleDeleteSelected}
        />
      )}
      
      <div 
        className="grid gap-4" 
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gridAutoRows: '1fr'
        }}
      >
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            selected={selectedImages.includes(image.id)}
            onSelect={() => toggleImageSelection(image.id)}
            onClick={() => onImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
}