// Client-side API utilities
import { supabase, getImageUrl } from './supabase';

export async function uploadImage(file: File) {
  try {
    // Upload to temp location first
    const tempPath = `temp/${Date.now()}_${file.name}`;
    await supabase.storage.from('images').upload(tempPath, file);
    
    // Get the URL
    const url = getImageUrl(tempPath);

    // Call server to process image
    const response = await fetch('/api/images/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tempPath, filename: file.name }),
    });

    if (!response.ok) {
      throw new Error('Failed to process image');
    }

    const { imageUrl, thumbnailUrl } = await response.json();
    return { url: imageUrl, thumbnailUrl };
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}