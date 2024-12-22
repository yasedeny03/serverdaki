import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGalleryStore } from '../../../store/gallery';
import { formatDate } from '../../../lib/utils';
import { Album } from '../../../types';

interface AlbumGridProps {
  albums: Album[];
}

export function AlbumGrid({ albums }: AlbumGridProps) {
  const images = useGalleryStore((state) => state.images);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {albums.map((album) => {
        const albumImages = images.filter(img => img.albumId === album.id);
        const coverImage = albumImages[0];
        
        return (
          <div 
            key={album.id}
            className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <button
              onClick={() => navigate(`/album/${album.id}`)}
              className="w-full text-left"
            >
              <div className="aspect-[4/3] bg-gray-100">
                {coverImage ? (
                  <img
                    src={coverImage.thumbnailUrl}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No images
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-gray-900 truncate text-sm">{album.name}</h3>
                {album.description && (
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">{album.description}</p>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                  <span>{albumImages.length} photos</span>
                  <span>•</span>
                  <span>{formatDate(album.createdAt)}</span>
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}