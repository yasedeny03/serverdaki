// src/pages/AdminDashboard/components/AlbumManager/AlbumList.tsx
import React from 'react';
import { AlbumCard } from './AlbumCard';
import { useGalleryStore } from '../../../../store/gallery';
import { Album } from '../../../../types'; // Import the Album type

export function AlbumList() {
    const albums: Album[] = useGalleryStore((state) => state.albums);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
                <AlbumCard key={album._id} album={album} />
            ))}
        </div>
    );
}
