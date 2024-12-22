import { v4 as uuidv4 } from 'uuid';

const UPLOADS_DIR = import.meta.env.VITE_UPLOAD_DIR || '/home/project/uploads';

export function generateFilePath(file: File, subdir: string = ''): string {
  const fileName = `${uuidv4()}_${file.name}`;
  return `/uploads/${subdir}/${fileName}`;
}

export function getPublicUrl(filePath: string): string {
  // Convert internal path to public URL
  return filePath;
}