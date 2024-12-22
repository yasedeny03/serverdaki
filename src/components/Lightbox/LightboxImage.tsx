import React from 'react';
import type { Image } from '../../types';

interface LightboxImageProps {
  image: Image;
}

export function LightboxImage({ image }: LightboxImageProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <img
        src={image.url}
        alt={image.title}
        className="max-w-[90vw] max-h-[80vh] object-contain"
        loading="eager"
      />
    </div>
  );
}