export interface Card {
  id: number;
  original: string;
  translation: string;
  // images: string[];
  cover: string | null;
  createdAt: string;
  updatedAt: string;
  owner: number;
}

export interface CardCreate {
  original: string;
  translation: string;
  images?: string[];
  cover?: string | null;
  group?: number;
}

export type CardChange = Partial<CardCreate>;
