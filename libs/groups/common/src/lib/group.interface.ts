import { Card } from '@bunch/cards/common';

export interface GroupDto {
  readonly id: number;
  readonly name: string;
  readonly cards: Card[];
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: number;
}

export interface GroupEntity {
  readonly id: number;
  readonly name: string;
  readonly cards: Card[];
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: number;
}

export type Group = GroupEntity;

export interface GroupCreate {
  readonly name: string;
  readonly cover?: string | null;
}

export type GroupChange = Partial<GroupCreate>;
