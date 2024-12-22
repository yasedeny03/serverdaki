import React, { useState } from 'react';
import { useGalleryStore } from '../../../store/gallery';
import { Album } from '../../../types';
import { Lightbox } from '../../../components/Lightbox';
import { ImageGrid } from './ImageGrid';

interface AlbumDetailsProps {
  album: Album;
  onBack: () => void;
}

export function AlbumDetails({ album, onBack }: AlbumDetailsProps) {
  const images = useGalleryStore((state) => 
    state.images.filter((img) => img.albumId === album.id)
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        ← Back to albums
      </button>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">{album.name}</h2>
        <p className="mt-2 text-gray-600">{album.description}</p>
      </div>

      <ImageGrid 
        images={images} 
        onImageClick={(index) => setLightboxIndex(index)} 
      />

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}