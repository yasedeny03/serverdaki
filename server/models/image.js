import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
  title: { type: String, required: true },
  description: String,
  filePath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

imageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Image = mongoose.model('Image', imageSchema);
