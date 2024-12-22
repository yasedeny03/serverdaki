import React from 'react';
import { Image } from '../../../../types';
import { ImageCard } from './ImageCard';

interface ImageListProps {
  images: Image[];
  selectedImages: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function ImageList({ images, selectedImages, onSelectionChange }: ImageListProps) {
  const toggleSelection = (id: string) => {
    if (selectedImages.includes(id)) {
      onSelectionChange(selectedImages.filter((imageId) => imageId !== id));
    } else {
      onSelectionChange([...selectedImages, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          selected={selectedImages.includes(image.id)}
          onSelect={() => toggleSelection(image.id)}
        />
      ))}
    </div>
  );
}