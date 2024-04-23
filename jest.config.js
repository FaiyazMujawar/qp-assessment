/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['./__tests__/data', './__tests__/setup'],
  setupFilesAfterEnv: ['./__tests__/setup/singleton.ts'],
};
