import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const STORAGE_BUCKET = 'images';

export async function uploadImage(file: File): Promise<{ url: string; thumbnailUrl: string }> {
  try {
    // Upload original image
    const imagePath = `images/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(imagePath, file);

    if (uploadError) throw uploadError;

    // Create thumbnail using original image URL
    const imageUrl = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(imagePath).data.publicUrl;

    // For now, use same image as thumbnail
    // In production, you'd want to implement server-side image processing
    const thumbnailUrl = imageUrl;

    return { url: imageUrl, thumbnailUrl };
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}