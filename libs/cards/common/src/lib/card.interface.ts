export interface Card {
  id: number;
  value: string;
  translations: Record<string, string>;
  images: string[];
  cover: string | null;
  created: string;
  updated: string;
  owner: number;
}

export interface CardGroup {
  id: number;
  name: string;
  cards: Card[];
  cover: string | null;
  created: string;
  updated: string;
  owner: number;
}
