import sharp from 'sharp';
import { FileStorage } from '../storage/fileStorage';
import { Image, IImage } from '../db/schema/image';

export class ImageService {
  private fileStorage: FileStorage;

  constructor() {
    this.fileStorage = new FileStorage();
  }

  async uploadImage(file: File, albumId: string): Promise<IImage> {
    // Process original image
    const buffer = await file.arrayBuffer();
    const optimizedBuffer = await sharp(buffer)
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Create thumbnail
    const thumbnailBuffer = await sharp(buffer)
      .resize(300, 300, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Save files
    const filename = await this.fileStorage.saveFile(
      new File([optimizedBuffer], file.name)
    );
    const thumbnailFilename = await this.fileStorage.saveFile(
      new File([thumbnailBuffer], `thumb_${file.name}`)
    );

    // Save to database
    const image = new Image({
      albumId,
      filename,
      thumbnailFilename,
      title: file.name,
      description: '',
      order: 0
    });

    await image.save();
    return image;
  }

  async deleteImage(imageId: string): Promise<void> {
    const image = await Image.findById(imageId);
    if (!image) return;

    await Promise.all([
      this.fileStorage.deleteFile(image.filename),
      this.fileStorage.deleteFile(image.thumbnailFilename),
      image.deleteOne()
    ]);
  }

  async getAlbumImages(albumId: string): Promise<IImage[]> {
    return Image.find({ albumId }).sort({ order: 1 });
  }

  async updateImageOrder(albumId: string, orderedIds: string[]): Promise<void> {
    await Promise.all(
      orderedIds.map((id, index) => 
        Image.findByIdAndUpdate(id, { order: index })
      )
    );
  }
}

export const imageService = new ImageService();