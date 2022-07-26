import { Card } from '@bunch/cards/common';

export interface GroupDto {
  readonly id: number | null;
  readonly uuid: string;
  readonly name: string;
  readonly cards: Card[];
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: number;
  readonly order: number;
}

export interface GroupEntity {
  readonly id: number | null;
  readonly uuid: string;
  readonly name: string;
  readonly cards: Card[];
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: number;
  readonly order: number;
}

export type Group = GroupEntity;

export interface GroupCreate {
  readonly uuid: string;
  readonly name: string;
  readonly cover?: string | null;
  readonly order?: number;
}

export type GroupChange = Partial<Omit<GroupCreate, 'uuid'>>;
