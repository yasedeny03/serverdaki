import React from 'react';
import { Image } from '../../types';

interface PublicImageGridProps {
  images: Image[];
  onImageClick: (index: number) => void;
}

export function PublicImageGrid({ images, onImageClick }: PublicImageGridProps) {
  return (
    <div 
      className="grid gap-4" 
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridAutoRows: '1fr'
      }}
    >
      {images.map((image, index) => (
        <button
          key={image.id}
          onClick={() => onImageClick(index)}
          className="relative block w-full aspect-square group"
        >
          <div className="absolute inset-0 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={image.thumbnailUrl}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>
        </button>
      ))}
    </div>
  );
}