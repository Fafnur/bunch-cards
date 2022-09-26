export interface CardDto {
  readonly uuid: string;
  readonly groupUuid: string;
  readonly original: string;
  readonly translation: string;
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: string;
}

export interface CardEntity {
  readonly uuid: string;
  readonly groupUuid: string;
  readonly original: string;
  readonly translation: string;
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Card extends CardEntity {}

export interface CardCreate {
  readonly uuid: string;
  readonly groupUuid: string;
  readonly original: string;
  readonly translation: string;
  readonly images?: string[];
  readonly cover?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CardChange extends CardCreate {}
