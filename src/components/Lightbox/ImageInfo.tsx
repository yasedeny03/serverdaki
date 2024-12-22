import React from 'react';
import { Image } from '../../types';
import { formatDate } from '../../lib/utils';

interface ImageInfoProps {
  image: Image;
}

export function ImageInfo({ image }: ImageInfoProps) {
  return (
    <div className="mt-4 text-white text-center">
      <h2 className="text-xl font-semibold">{image.title}</h2>
      <p className="mt-2 text-gray-300">{image.description}</p>
      <p className="mt-1 text-sm text-gray-400">
        Added {formatDate(image.createdAt)}
      </p>
    </div>
  );
}