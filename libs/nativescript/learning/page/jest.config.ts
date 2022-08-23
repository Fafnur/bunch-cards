/* eslint-disable */
export default {
  displayName: 'nativescript-learning-page',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/nativescript/learning/page',
  preset: '../../../../jest.preset.js',
};
