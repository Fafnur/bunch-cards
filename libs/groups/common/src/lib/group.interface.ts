import { Card } from '@bunch/cards/common';

export interface GroupDto {
  readonly uuid: string;
  readonly name: string;
  readonly cards: Card[];
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: string;
  readonly order: number;
  readonly orderCards: string[];
}

export interface GroupEntity {
  readonly uuid: string;
  readonly name: string;
  readonly cards: string[];
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: string;
  readonly order: number;
  readonly orderCards?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Group extends GroupEntity {}

export interface GroupCreate {
  readonly uuid: string;
  readonly name: string;
  readonly cover?: string | null;
  readonly order?: number;
  readonly orderCards?: string[];
  readonly cards?: string[];
}

export type GroupChange = Partial<GroupEntity>;
