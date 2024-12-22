import { createWriteStream, mkdir } from 'fs/promises';
import { join } from 'path';
import { format } from 'date-fns';

export class LogService {
  private logDir: string;
  private logStream: ReturnType<typeof createWriteStream> | null = null;

  constructor() {
    this.logDir = join(process.cwd(), 'logs');
    this.initializeLogDirectory();
  }

  private async initializeLogDirectory() {
    await mkdir(this.logDir, { recursive: true });
    const filename = `${format(new Date(), 'yyyy-MM-dd')}.log`;
    this.logStream = createWriteStream(join(this.logDir, filename), { flags: 'a' });
  }

  info(message: string, meta?: object) {
    this.log('INFO', message, meta);
  }

  error(message: string, error?: Error, meta?: object) {
    this.log('ERROR', message, { ...meta, error: error?.stack });
  }

  warn(message: string, meta?: object) {
    this.log('WARN', message, meta);
  }

  private log(level: string, message: string, meta?: object) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta,
    };

    this.logStream?.write(`${JSON.stringify(logEntry)}\n`);
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level}] ${message}`, meta);
    }
  }
}

export const logService = new LogService();