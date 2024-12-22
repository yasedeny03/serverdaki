import React, { useCallback, useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import { useGalleryStore } from '../../store/gallery';
import { imagesApi } from '../../lib/api/images'; // Import the imagesApi


interface ImageUploaderProps {
    albumId: string;
}

export function ImageUploader({ albumId }: ImageUploaderProps) {
    const addImages = useGalleryStore((state) => state.addImages);
    const [isUploading, setIsUploading] = useState(false);


    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;

        setIsUploading(true);
        try {
            const validFiles = files.filter(file =>
                file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
            );
            const uploadPromises = validFiles.map(async (file) => {
                return await imagesApi.upload(file, albumId);
            })
            const newImages = await Promise.all(uploadPromises);
             addImages(newImages.map(img => ({
                albumId,
                 url: img.imageUrl,
                thumbnailUrl: img.thumbnailUrl,
                title:  img.imageUrl.split("/").pop() || "Uploaded Image"
            })))

        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload images. Please try again.');
        } finally {
            setIsUploading(false);
            event.target.value = '';
        }
    }, [addImages, albumId]);

    return (
        <div>
            <label
                htmlFor={`image-upload-${albumId}`}
                className={`inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                    isUploading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                }`}
            >
                {isUploading ? (
                    <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <Upload className="h-5 w-5" />
                        Upload Images
                    </>
                )}
            </label>
            <input
                id={`image-upload-${albumId}`}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
            />
        </div>
    );
}
