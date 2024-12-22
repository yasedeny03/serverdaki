import { db } from './schema';
import type { Image } from '../../types';

export const imagesDb = {
  // Create a new image
  create: (input: Omit<Image, 'id' | 'createdAt' | 'updatedAt'>): Image => {
    const stmt = db.prepare(`
      INSERT INTO images (id, album_id, title, description, url, thumbnail_url, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const id = crypto.randomUUID();
    const result = stmt.run(
      id,
      input.albumId,
      input.title,
      input.description,
      input.url,
      input.thumbnailUrl,
      input.order
    );

    if (result.changes !== 1) {
      throw new Error('Failed to create image');
    }

    return this.getById(id)!;
  },

  // Get image by ID
  getById: (id: string): Image | undefined => {
    const image = db.prepare('SELECT * FROM images WHERE id = ?').get(id);
    return image ? {
      ...image,
      albumId: image.album_id,
      thumbnailUrl: image.thumbnail_url,
      order: image.order_index,
      createdAt: new Date(image.created_at),
      updatedAt: new Date(image.updated_at),
    } : undefined;
  },

  // Update image
  update: (id: string, input: Partial<Omit<Image, 'id' | 'createdAt' | 'updatedAt'>>): Image => {
    const updates: string[] = [];
    const values: any[] = [];

    if (input.albumId !== undefined) {
      updates.push('album_id = ?');
      values.push(input.albumId);
    }
    if (input.title !== undefined) {
      updates.push('title = ?');
      values.push(input.title);
    }
    if (input.description !== undefined) {
      updates.push('description = ?');
      values.push(input.description);
    }
    if (input.url !== undefined) {
      updates.push('url = ?');
      values.push(input.url);
    }
    if (input.thumbnailUrl !== undefined) {
      updates.push('thumbnail_url = ?');
      values.push(input.thumbnailUrl);
    }
    if (input.order !== undefined) {
      updates.push('order_index = ?');
      values.push(input.order);
    }

    updates.push('updated_at = datetime("now")');
    values.push(id);

    const stmt = db.prepare(`
      UPDATE images
      SET ${updates.join(', ')}
      WHERE id = ?
    `);

    const result = stmt.run(...values);

    if (result.changes !== 1) {
      throw new Error('Failed to update image');
    }

    return this.getById(id)!;
  },

  // Delete image
  delete: (id: string): void => {
    const result = db.prepare('DELETE FROM images WHERE id = ?').run(id);
    if (result.changes !== 1) {
      throw new Error('Failed to delete image');
    }
  },

  // Get all images
  getAll: (): Image[] => {
    return db.prepare('SELECT * FROM images ORDER BY order_index').all().map(image => ({
      ...image,
      albumId: image.album_id,
      thumbnailUrl: image.thumbnail_url,
      order: image.order_index,
      createdAt: new Date(image.created_at),
      updatedAt: new Date(image.updated_at),
    }));
  },

  // Get images by album ID
  getByAlbumId: (albumId: string): Image[] => {
    return db.prepare('SELECT * FROM images WHERE album_id = ? ORDER BY order_index').all(albumId).map(image => ({
      ...image,
      albumId: image.album_id,
      thumbnailUrl: image.thumbnail_url,
      order: image.order_index,
      createdAt: new Date(image.created_at),
      updatedAt: new Date(image.updated_at),
    }));
  },

  // Update image order in an album
  reorder: (albumId: string, orderedIds: string[]): void => {
    const stmt = db.prepare('UPDATE images SET order_index = ? WHERE id = ?');
    
    db.transaction(() => {
      orderedIds.forEach((id, index) => {
        stmt.run(index, id);
      });
    })();
  },
};