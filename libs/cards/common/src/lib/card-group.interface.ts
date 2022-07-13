import { Card } from './card.interface';

export interface CardGroup {
  id: number;
  name: string;
  cards: Card[];
  cover: string | null;
  createdAt: string;
  updatedAt: string;
  owner: number;
}

export interface CardGroupCreate {
  name: string;
  cover?: string | null;
}
