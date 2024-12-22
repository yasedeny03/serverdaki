import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useGalleryStore } from '../../store/gallery';
import { generateThumbnail } from '../../lib/utils';

interface ImageUploaderProps {
  albumId: string;
}

export function ImageUploader({ albumId }: ImageUploaderProps) {
  const addImages = useGalleryStore((state) => state.addImages);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
    );

    const newImages = await Promise.all(
      validFiles.map(async (file) => {
        const thumbnailUrl = await generateThumbnail(file);
        const url = URL.createObjectURL(file);

        return {
          id: crypto.randomUUID(),
          albumId,
          title: file.name,
          description: '',
          url,
          thumbnailUrl,
          order: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    addImages(newImages);
  }, [addImages, albumId]);

  return (
    <div>
      <label
        htmlFor="image-upload"
        className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
      >
        <Upload className="h-5 w-5" />
        Upload Images
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}