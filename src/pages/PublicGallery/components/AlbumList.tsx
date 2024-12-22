import React from 'react';
import { useGalleryStore } from '../../../store/gallery';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../lib/utils';

export function AlbumList() {
  const albums = useGalleryStore((state) => state.albums);
  const images = useGalleryStore((state) => state.images);
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {albums.map((album) => {
        const albumImages = images.filter(img => img.albumId === album.id);
        const coverImage = albumImages[0];
        
        return (
          <div 
            key={album.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => navigate(`/album/${album.id}`)}
              className="w-full text-left p-6 flex gap-6 items-start"
            >
              <div className="w-40 h-40 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                {coverImage ? (
                  <img
                    src={coverImage.thumbnailUrl}
                    alt={album.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No images
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-gray-900">{album.name}</h2>
                <p className="mt-1 text-gray-600">{album.description}</p>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span>{albumImages.length} photos</span>
                  <span>Created {formatDate(album.createdAt)}</span>
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}