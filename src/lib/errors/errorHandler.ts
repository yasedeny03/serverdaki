import { logService } from '../services/logService';
import { AppError } from './AppError';

export function handleError(error: unknown): void {
  if (error instanceof AppError) {
    logService.error(error.message, error, {
      code: error.code,
      details: error.details,
      statusCode: error.statusCode,
    });
  } else if (error instanceof Error) {
    logService.error('Unexpected error occurred', error);
  } else {
    logService.error('Unknown error occurred', new Error(String(error)));
  }
}

export function wrapAsync<T>(fn: () => Promise<T>): Promise<T> {
  return fn().catch((error) => {
    handleError(error);
    throw error;
  });
}