import React from 'react';
import { Image } from '../../types';
import { Trash2, MoveVertical } from 'lucide-react';
import { useGalleryStore } from '../../store/gallery';

interface AlbumImageGridProps {
  images: Image[];
  onImageClick: (index: number) => void;
  isEditing?: boolean;
}

export function AlbumImageGrid({ images, onImageClick, isEditing }: AlbumImageGridProps) {
  const { deleteImage, reorderImages } = useGalleryStore();
  const [draggedImage, setDraggedImage] = React.useState<string | null>(null);

  const handleDragStart = (imageId: string) => {
    setDraggedImage(imageId);
  };

  const handleDrop = (targetId: string) => {
    if (!draggedImage || draggedImage === targetId) return;

    const newOrder = images.map(img => img.id);
    const draggedIdx = newOrder.indexOf(draggedImage);
    const targetIdx = newOrder.indexOf(targetId);

    newOrder.splice(draggedIdx, 1);
    newOrder.splice(targetIdx, 0, draggedImage);

    reorderImages(images[0].albumId, newOrder);
    setDraggedImage(null);
  };

  return (
    <div 
      className="grid gap-3" 
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gridAutoRows: '1fr'
      }}
    >
      {images.map((image, index) => (
        <div
          key={image.id}
          draggable={isEditing}
          onDragStart={() => handleDragStart(image.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(image.id);
          }}
          className="group relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100"
        >
          <img
            src={image.thumbnailUrl}
            alt={image.title}
            className="w-full h-full object-cover"
            onClick={() => !isEditing && onImageClick(index)}
          />
          
          {isEditing && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => deleteImage(image.id)}
                  className="p-1 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button className="p-1 rounded-full bg-white/10 text-white cursor-move">
                  <MoveVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}