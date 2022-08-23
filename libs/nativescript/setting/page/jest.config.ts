/* eslint-disable */
export default {
  displayName: 'nativescript-setting-page',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/nativescript/setting/page',
  preset: '../../../../jest.preset.js',
};
