import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Check } from 'lucide-react';
import { useGalleryStore } from '../../store/gallery';
import { AlbumImageGrid } from './AlbumImageGrid';
import { AlbumUploader } from './AlbumUploader';
import { Lightbox } from '../Lightbox';
import { ViewOptions } from '../ViewOptions';

export function AlbumView() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const album = useGalleryStore(state => 
    state.albums.find(a => a.id === albumId!)
  );
  
  const albumImages = useGalleryStore(state =>
    state.images.filter(img => img.albumId === albumId)
  );

  if (!album) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Album not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-indigo-600 hover:text-indigo-500"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">{album.name}</h2>
          <p className="mt-1 text-gray-600">{album.description}</p>
        </div>
        <div className="flex gap-4">
          <ViewOptions />
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {isEditing ? (
              <>
                <Check className="h-4 w-4" />
                Done
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <AlbumUploader albumId={album.id} />
        <AlbumImageGrid 
          images={albumImages}
          onImageClick={(index) => setLightboxIndex(index)}
          isEditing={isEditing}
        />
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={albumImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}