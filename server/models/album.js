import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

albumSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Album = mongoose.model('Album', albumSchema);