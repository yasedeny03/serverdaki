import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGalleryStore } from '../../../../store/gallery';
import { ImageUploader } from '../../../../components/ImageManager/ImageUploader';
import { ImageGrid } from '../../../../components/ImageManager/ImageGrid';
import { Lightbox } from '../../../../components/Lightbox';

export function AdminAlbumView() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const fetchAlbumImages = useGalleryStore(state => state.fetchAlbumImages)


   const album = useGalleryStore(state =>
        state.albums.find(a => String(a._id) === albumId)
    );


  const albumImages = useGalleryStore(state =>
        state.images.filter(img => img.albumId === albumId)
    );


  useEffect(() => {
    if (albumId){
      fetchAlbumImages(albumId);
    }
  }, [albumId, fetchAlbumImages])


  if (!album) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Album not found</h2>
        <button
          onClick={() => navigate('/admin/albums')}
          className="mt-4 text-indigo-600 hover:text-indigo-500"
        >
          Return to albums
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate('/admin/albums')}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to albums
        </button>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">{album.name}</h2>
        <p className="mt-1 text-gray-600">{album.description}</p>
      </div>

      <div className="space-y-6">
        <ImageUploader albumId={album._id} />

        {albumImages.length > 0 ? (
          <ImageGrid
            images={albumImages}
            onImageClick={(index) => setLightboxIndex(index)}
          />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No images in this album yet</p>
            <p className="text-sm text-gray-400 mt-1">Upload images using the button above</p>
          </div>
        )}
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
