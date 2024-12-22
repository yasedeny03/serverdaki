// server/routes/images.js
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Image } from '../models/image.js'; // Import the Image model
import mongoose from 'mongoose';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/images'),
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Upload image
router.post('/upload', upload.single('image'), async (req, res) => { // Ensure route matches the frontend
  try {
    const file = req.file;
    const thumbnailName = `thumb_${file.filename}`;
    await sharp(file.path)
      .resize(200)
      .toFile(path.join(__dirname, '../uploads/thumbnails', thumbnailName));

    const imageUrl = `/uploads/images/${file.filename}`;
    const thumbnailUrl = `/uploads/thumbnails/${thumbnailName}`;

    res.status(201).json({ imageUrl, thumbnailUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get images by album
router.get('/album/:albumId', async (req, res) => {
  try {
    const albumId = mongoose.Types.ObjectId(req.params.albumId); // Convert to ObjectId
    const images = await Image.find({ albumId })
      .sort('order')
      .exec();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: error.message });
  }
});
// Delete image
router.delete('/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
