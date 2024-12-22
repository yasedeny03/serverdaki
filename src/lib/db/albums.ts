import { db } from './schema';
import type { Album } from '../../types';

export const albumsDb = {
  // Create a new album
  create: (input: Omit<Album, 'id' | 'createdAt' | 'updatedAt'>): Album => {
    const stmt = db.prepare(`
      INSERT INTO albums (id, name, description)
      VALUES (?, ?, ?)
    `);

    const id = crypto.randomUUID();
    const result = stmt.run(id, input.name, input.description);

    if (result.changes !== 1) {
      throw new Error('Failed to create album');
    }

    return this.getById(id)!;
  },

  // Get album by ID
  getById: (id: string): Album | undefined => {
    const album = db.prepare('SELECT * FROM albums WHERE id = ?').get(id);
    return album ? {
      ...album,
      createdAt: new Date(album.created_at),
      updatedAt: new Date(album.updated_at),
    } : undefined;
  },

  // Update album
  update: (id: string, input: Partial<Omit<Album, 'id' | 'createdAt' | 'updatedAt'>>): Album => {
    const updates: string[] = [];
    const values: any[] = [];

    if (input.name !== undefined) {
      updates.push('name = ?');
      values.push(input.name);
    }
    if (input.description !== undefined) {
      updates.push('description = ?');
      values.push(input.description);
    }

    updates.push('updated_at = datetime("now")');
    values.push(id);

    const stmt = db.prepare(`
      UPDATE albums
      SET ${updates.join(', ')}
      WHERE id = ?
    `);

    const result = stmt.run(...values);

    if (result.changes !== 1) {
      throw new Error('Failed to update album');
    }

    return this.getById(id)!;
  },

  // Delete album
  delete: (id: string): void => {
    const result = db.prepare('DELETE FROM albums WHERE id = ?').run(id);
    if (result.changes !== 1) {
      throw new Error('Failed to delete album');
    }
  },

  // Get all albums
  getAll: (): Album[] => {
    return db.prepare('SELECT * FROM albums').all().map(album => ({
      ...album,
      createdAt: new Date(album.created_at),
      updatedAt: new Date(album.updated_at),
    }));
  },
};