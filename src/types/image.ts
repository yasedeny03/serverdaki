export interface Image {
  id: string;
  albumId: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}