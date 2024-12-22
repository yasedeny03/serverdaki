import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxControlsProps {
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function LightboxControls({ 
  onClose, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext 
}: LightboxControlsProps) {
  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 z-50"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {hasPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 z-50"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-gray-300 z-50"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}
    </>
  );
}