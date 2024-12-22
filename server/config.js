import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/gallery_app',
  },
  uploads: {
    directory: process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads'),
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || 'localhost',
  },
};