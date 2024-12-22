import { db } from './schema';
import type { User, CreateUserInput, UpdateUserInput } from '../../types/user';

export const usersDb = {
  // Create a new user
  create: (input: CreateUserInput): User => {
    const stmt = db.prepare(`
      INSERT INTO users (id, display_name, password, role)
      VALUES (?, ?, ?, ?)
    `);

    const id = crypto.randomUUID();
    const result = stmt.run(id, input.displayName, input.password, input.role || 'user');

    if (result.changes !== 1) {
      throw new Error('Failed to create user');
    }

    // Add album access if provided
    if (input.albumAccess?.length) {
      const accessStmt = db.prepare(`
        INSERT INTO user_album_access (user_id, album_id)
        VALUES (?, ?)
      `);

      for (const albumId of input.albumAccess) {
        accessStmt.run(id, albumId);
      }
    }

    return this.getById(id)!;
  },

  // Get user by ID
  getById: (id: string): User | undefined => {
    const user = db.prepare(`
      SELECT u.*, GROUP_CONCAT(uaa.album_id) as album_access
      FROM users u
      LEFT JOIN user_album_access uaa ON u.id = uaa.user_id
      WHERE u.id = ?
      GROUP BY u.id
    `).get(id);

    if (!user) return undefined;

    return {
      ...user,
      albumAccess: user.album_access ? user.album_access.split(',') : [],
    };
  },

  // Get user by password
  getByPassword: (password: string): User | undefined => {
    const user = db.prepare(`
      SELECT u.*, GROUP_CONCAT(uaa.album_id) as album_access
      FROM users u
      LEFT JOIN user_album_access uaa ON u.id = uaa.user_id
      WHERE u.password = ?
      GROUP BY u.id
    `).get(password);

    if (!user) return undefined;

    return {
      ...user,
      albumAccess: user.album_access ? user.album_access.split(',') : [],
    };
  },

  // Update user
  update: (id: string, input: UpdateUserInput): User => {
    const updates: string[] = [];
    const values: any[] = [];

    if (input.displayName !== undefined) {
      updates.push('display_name = ?');
      values.push(input.displayName);
    }
    if (input.password !== undefined) {
      updates.push('password = ?');
      values.push(input.password);
    }
    if (input.role !== undefined) {
      updates.push('role = ?');
      values.push(input.role);
    }

    updates.push('updated_at = datetime("now")');
    values.push(id);

    const stmt = db.prepare(`
      UPDATE users
      SET ${updates.join(', ')}
      WHERE id = ?
    `);

    const result = stmt.run(...values);

    if (result.changes !== 1) {
      throw new Error('Failed to update user');
    }

    // Update album access if provided
    if (input.albumAccess !== undefined) {
      // Delete existing access
      db.prepare('DELETE FROM user_album_access WHERE user_id = ?').run(id);

      // Add new access
      if (input.albumAccess.length > 0) {
        const accessStmt = db.prepare(`
          INSERT INTO user_album_access (user_id, album_id)
          VALUES (?, ?)
        `);

        for (const albumId of input.albumAccess) {
          accessStmt.run(id, albumId);
        }
      }
    }

    return this.getById(id)!;
  },

  // Delete user
  delete: (id: string): void => {
    const result = db.prepare('DELETE FROM users WHERE id = ?').run(id);
    if (result.changes !== 1) {
      throw new Error('Failed to delete user');
    }
  },

  // Get all users
  getAll: (): User[] => {
    return db.prepare(`
      SELECT u.*, GROUP_CONCAT(uaa.album_id) as album_access
      FROM users u
      LEFT JOIN user_album_access uaa ON u.id = uaa.user_id
      GROUP BY u.id
    `).all().map(user => ({
      ...user,
      albumAccess: user.album_access ? user.album_access.split(',') : [],
    }));
  },
};