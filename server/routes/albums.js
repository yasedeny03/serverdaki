import express from 'express';
import { Album } from '../models/album.js';

const router = express.Router();

// Get all albums
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find().sort('-createdAt');
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create album
router.post('/', async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update album
router.put('/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete album
router.delete('/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json({ message: 'Album deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;