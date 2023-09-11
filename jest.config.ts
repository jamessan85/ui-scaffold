/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/logger/',
    '/src/server.ts',
    'config.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleDirectories: ['node_modules'],
  preset: 'ts-jest',
  snapshotSerializers: ['jest-serializer-html'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
};
