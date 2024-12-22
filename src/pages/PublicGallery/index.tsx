import React from 'react';
import { AlbumGrid } from './components/AlbumGrid';
import { useAuthStore } from '../../store/auth';
import { useGalleryStore } from '../../store/gallery';

export function PublicGallery() {
  const user = useAuthStore((state) => state.user);
  const albums = useGalleryStore((state) => state.albums);

  // Filter albums based on user's role and access
  const accessibleAlbums = albums.filter(album => {
    if (user?.role === 'admin') return true;
    return user?.albumAccess.includes(album.id);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <AlbumGrid albums={accessibleAlbums} />
    </div>
  );
}