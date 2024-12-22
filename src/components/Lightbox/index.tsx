import React from 'react';
import type { Image } from '../../types';
import { LightboxImage } from './LightboxImage';
import { LightboxControls } from './LightboxControls';
import { ImageInfo } from './ImageInfo';
import { useKeyPress } from '../../hooks/useKeyPress';

interface LightboxProps {
  images: Image[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const currentImage = images[currentIndex];
  
  useKeyPress('Escape', onClose);
  useKeyPress('ArrowLeft', () => currentIndex > 0 && onNavigate(currentIndex - 1));
  useKeyPress('ArrowRight', () => currentIndex < images.length - 1 && onNavigate(currentIndex + 1));

  if (!currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <LightboxControls
          onClose={onClose}
          onPrevious={() => onNavigate(currentIndex - 1)}
          onNext={() => onNavigate(currentIndex + 1)}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < images.length - 1}
        />
        
        <LightboxImage image={currentImage} />
        <ImageInfo image={currentImage} />
      </div>
    </div>
  );
}