export interface Card {
  id: number;
  value: string;
  translations: Record<string, string>;
  images: string[];
  cover: string | null;
  created: string;
  updated: string;
}

export interface CardGroup {
  id: number;
  cards: Card;
  cover: string | null;
  created: string;
  updated: string;
}

// export interface Language {}
