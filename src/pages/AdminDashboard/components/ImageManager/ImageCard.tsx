import React from 'react';
import { Image } from '../../../../types';
import { Check } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface ImageCardProps {
  image: Image;
  selected: boolean;
  onSelect: () => void;
}

export function ImageCard({ image, selected, onSelect }: ImageCardProps) {
  return (
    <div
      className={cn(
        'group relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100',
        selected && 'ring-2 ring-indigo-500'
      )}
    >
      <img
        src={image.thumbnailUrl}
        alt={image.title}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
      
      <button
        onClick={onSelect}
        className={cn(
          'absolute top-2 right-2 p-1 rounded-full',
          selected
            ? 'bg-indigo-500 text-white'
            : 'bg-white text-gray-500 opacity-0 group-hover:opacity-100'
        )}
      >
        <Check className="h-4 w-4" />
      </button>

      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-sm font-medium text-white truncate">{image.title}</h3>
      </div>
    </div>
  );
}