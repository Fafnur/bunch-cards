/* eslint-disable */
export default {
  displayName: 'nativescript-ui-nav',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/nativescript/ui/nav',
  preset: '../../../../jest.preset.js',
};
