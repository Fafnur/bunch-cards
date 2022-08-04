import { Group, GroupCreate, GroupDto } from './group.interface';

export const GROUP_DTO_STUB: GroupDto = {
  uuid: 'simple-uuid',
  name: 'Simple Group',
  cards: [],
  cover: null,
  createdAt: '2022-07-24T15:18:35.183Z',
  updatedAt: '2022-07-24T15:18:35.183Z',
  owner: 1,
  order: 1,
  orderCards: [],
};

export const GROUP_STUB: Group = {
  ...GROUP_DTO_STUB,
  cards: [],
};

export const GROUPS_DTO_STUB: GroupDto[] = [GROUP_DTO_STUB];
export const GROUPS_STUB: Group[] = [GROUP_STUB];

export const GROUP_CREATE_STUB: GroupCreate = {
  name: 'Simple Group',
  uuid: 'simple-uuid',
};

export const GROUP_CHANGE_STUB: GroupCreate = GROUP_CREATE_STUB;
