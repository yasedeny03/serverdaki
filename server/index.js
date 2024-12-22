import express from 'express';
import cors from 'cors';
import imagesRoutes from './routes/images.js';
import albumRoutes from './routes/albums.js'; // Import album routes
import userRoutes from './routes/users.js'; // Import user routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/images', imagesRoutes); // Ensure the `/api` prefix matches the frontend baseURL
app.use('/api/albums', albumRoutes); // Use album routes with /api/albums prefix
app.use('/api/users', userRoutes); // Use user routes with /api/users prefix

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
