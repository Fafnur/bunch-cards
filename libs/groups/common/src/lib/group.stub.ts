import { GroupCreate, GroupDto } from './group.interface';

export const GROUP_STUB: GroupDto = {
  id: null,
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

export const GROUPS_STUB: GroupDto[] = [GROUP_STUB];

export const GROUP_CREATE_STUB: GroupCreate = {
  name: 'Simple Group',
  uuid: 'simple-uuid',
};

export const GROUP_CHANGE_STUB: GroupCreate = GROUP_CREATE_STUB;
