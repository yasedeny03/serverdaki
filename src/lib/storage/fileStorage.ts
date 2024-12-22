import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export class FileStorage {
  static getUploadPath(filename: string): string {
    return path.join(UPLOAD_DIR, filename);
  }

  static generateFilename(originalFilename: string): string {
    const extension = originalFilename.split('.').pop() || '';
    return `${uuidv4()}.${extension}`;
  }
}