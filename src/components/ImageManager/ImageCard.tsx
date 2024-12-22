import React from 'react';
import { Image } from '../../types';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImageCardProps {
  image: Image;
  selected: boolean;
  onSelect: () => void;
  onClick: () => void;
}

export function ImageCard({ image, selected, onSelect, onClick }: ImageCardProps) {
  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <div
      className={cn(
        'group relative aspect-square rounded-lg overflow-hidden bg-gray-100',
        selected && 'ring-2 ring-indigo-500'
      )}
      onClick={onClick}
    >
      <img
        src={image.thumbnailUrl}
        alt={image.title}
        className="w-full h-full object-cover"
      />
      
      <button
        type="button"
        onClick={handleSelect}
        className={cn(
          'absolute top-2 right-2 p-1.5 rounded-full transition-all z-10',
          selected
            ? 'bg-indigo-500 text-white'
            : 'bg-white/80 text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-white'
        )}
      >
        <Check className="h-4 w-4" />
      </button>

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
    </div>
  );
}