import { Card } from '@bunch/cards/common';

export interface Group {
  id: number;
  name: string;
  cards: Card[];
  cover: string | null;
  createdAt: string;
  updatedAt: string;
  owner: number;
}

export interface GroupCreate {
  name: string;
  cover?: string | null;
}

export type GroupChange = Partial<GroupCreate>;
