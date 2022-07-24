import { Group, GroupCreate } from './group.interface';

export const GROUP_STUB: Group = {
  id: 1,
  name: 'Simple Group',
  cards: [],
  cover: null,
  createdAt: '2022-07-24T15:18:35.183Z',
  updatedAt: '2022-07-24T15:18:35.183Z',
  owner: 1,
};

export const GROUPS_STUB: Group[] = [GROUP_STUB];

export const GROUP_CREATE_STUB: GroupCreate = {
  name: 'Simple Group New',
};

export const GROUP_CHANGE_STUB: GroupCreate = GROUP_CREATE_STUB;
