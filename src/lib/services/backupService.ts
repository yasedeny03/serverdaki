import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { format } from 'date-fns';
import { config } from '../config';
import { logService } from './logService';

const execAsync = promisify(exec);

export class BackupService {
  private backupDir: string;

  constructor() {
    this.backupDir = join(process.cwd(), 'backups');
  }

  async createBackup(): Promise<string> {
    try {
      const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm-ss');
      const backupPath = join(this.backupDir, timestamp);
      
      await mkdir(backupPath, { recursive: true });
      
      // Backup MongoDB
      await this.backupMongoDB(backupPath);
      
      // Backup uploads
      await this.backupUploads(backupPath);
      
      logService.info(`Backup created successfully at ${backupPath}`);
      return backupPath;
    } catch (error) {
      logService.error('Backup failed', error as Error);
      throw error;
    }
  }

  async restoreBackup(backupPath: string): Promise<void> {
    try {
      // Restore MongoDB
      await this.restoreMongoDB(backupPath);
      
      // Restore uploads
      await this.restoreUploads(backupPath);
      
      logService.info(`Backup restored successfully from ${backupPath}`);
    } catch (error) {
      logService.error('Backup restoration failed', error as Error);
      throw error;
    }
  }

  private async backupMongoDB(backupPath: string): Promise<void> {
    const { uri, dbName } = config.mongodb;
    const command = `mongodump --uri="${uri}" --db=${dbName} --out=${join(backupPath, 'mongodb')}`;
    await execAsync(command);
  }

  private async backupUploads(backupPath: string): Promise<void> {
    const command = `rsync -av ${config.uploads.directory}/ ${join(backupPath, 'uploads')}/`;
    await execAsync(command);
  }

  private async restoreMongoDB(backupPath: string): Promise<void> {
    const { uri, dbName } = config.mongodb;
    const command = `mongorestore --uri="${uri}" --db=${dbName} ${join(backupPath, 'mongodb', dbName)}`;
    await execAsync(command);
  }

  private async restoreUploads(backupPath: string): Promise<void> {
    const command = `rsync -av ${join(backupPath, 'uploads')}/ ${config.uploads.directory}/`;
    await execAsync(command);
  }
}

export const backupService = new BackupService();