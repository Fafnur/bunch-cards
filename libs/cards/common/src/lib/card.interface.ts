export interface CardDto {
  readonly uuid: string;
  readonly original: string;
  readonly translation: string;
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: number;
}

export interface CardEntity {
  readonly uuid: string;
  readonly original: string;
  readonly translation: string;
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: number;
}

export type Card = CardEntity;

export interface CardCreate {
  readonly uuid: string;
  readonly original: string;
  readonly translation: string;
  readonly images?: string[];
  readonly cover?: string | null;
  readonly groupUuid?: string;
}

export type CardChange = Partial<Omit<CardCreate, 'uuid'>>;
