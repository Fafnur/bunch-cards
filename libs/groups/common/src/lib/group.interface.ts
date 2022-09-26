export interface GroupDto {
  readonly uuid: string;
  readonly name: string;
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: string;
  readonly order: number;
}

export interface GroupEntity {
  readonly uuid: string;
  readonly name: string;
  readonly cover: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: string;
  readonly order: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Group extends GroupEntity {}

export interface GroupCreate {
  readonly uuid: string;
  readonly name: string;
  readonly cover?: string | null;
  readonly order?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GroupChange extends GroupCreate {}
