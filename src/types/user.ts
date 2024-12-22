export interface User {
  id: string;
  displayName: string;
  password: string;
  role: 'admin' | 'user';
  albumAccess: string[]; // Array of album IDs
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  displayName: string;
  password: string;
  role?: 'admin' | 'user';
  albumAccess?: string[];
}

export interface UpdateUserInput {
  displayName?: string;
  password?: string;
  role?: 'admin' | 'user';
  albumAccess?: string[];
}