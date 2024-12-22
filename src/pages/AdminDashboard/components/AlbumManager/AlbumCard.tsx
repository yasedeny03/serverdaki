// src/pages/AdminDashboard/components/AlbumManager/AlbumCard.tsx
import React from 'react';
import { Album } from '../../../../types';
import { Edit2, Trash2, Image } from 'lucide-react';
import { useGalleryStore } from '../../../../store/gallery';
import { useAlbumDialog } from '../../../../contexts/AlbumDialogContext';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../../lib/utils';

interface AlbumCardProps {
    album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
    const navigate = useNavigate();
    const { openDialog } = useAlbumDialog();
    const deleteAlbum = useGalleryStore((state) => state.deleteAlbum);
    const images = useGalleryStore((state) =>
       state.images.filter(img => img.albumId === album._id)
     );

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
                onClick={() => navigate(`/admin/albums/${album._id}`)}
                className="w-full text-left"
            >
                <div className="aspect-square bg-gray-100">
                     {images[0] ? (
                        <img
                            src={images[0].thumbnailUrl}
                            alt={album.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <Image className="h-8 w-8 mb-2" />
                            <span className="text-sm">No images</span>
                        </div>
                    )}
                </div>
            </button>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{album.name}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{album.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        {images.length} {images.length === 1 ? 'image' : 'images'} • {formatDate(album.createdAt)}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                openDialog(album);
                            }}
                            className="p-1 text-gray-500 hover:text-indigo-600"
                        >
                            <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteAlbum(album._id);
                            }}
                            className="p-1 text-gray-500 hover:text-red-600"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
