import mongoose from 'mongoose';
import fs from 'fs/promises';
import { config } from './config.js';

export async function connectDB() {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log('Connected to MongoDB');
    
    // Create uploads directory if it doesn't exist
    await fs.mkdir(config.uploads.directory, { recursive: true });
    console.log('Uploads directory created');
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}