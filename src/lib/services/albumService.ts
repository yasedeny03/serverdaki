import { albumRepository } from '../db/mongodb/repositories';
import { FileStorage } from '../storage/fileStorage';
import type { Album } from '../../types';
import { MongoAlbum } from '../db/mongodb/schemas/album';

export class AlbumService {
  private fileStorage: FileStorage;

  constructor() {
    this.fileStorage = new FileStorage();
  }

  async getAllAlbums(): Promise<Album[]> {
    const albums = await albumRepository.findAll();
    return albums.map(this.mapMongoAlbumToAlbum);
  }

  async getAlbumById(id: string): Promise<Album | null> {
    const album = await albumRepository.findById(id);
    return album ? this.mapMongoAlbumToAlbum(album) : null;
  }

  async createAlbum(data: Pick<Album, 'name' | 'description'>): Promise<Album> {
    const now = new Date();
    const album = await albumRepository.create({
      name: data.name,
      description: data.description,
      createdAt: now,
      updatedAt: now,
    });
    
    return this.mapMongoAlbumToAlbum(album);
  }

  async updateAlbum(id: string, data: Partial<Album>): Promise<boolean> {
    return albumRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  }

  async deleteAlbum(id: string): Promise<boolean> {
    return albumRepository.delete(id);
  }

  private mapMongoAlbumToAlbum(album: MongoAlbum): Album {
    return {
      id: album._id.toString(),
      name: album.name,
      description: album.description,
      createdAt: album.createdAt,
      updatedAt: album.updatedAt,
    };
  }
}