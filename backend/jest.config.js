/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/build/**',
    '!jest.config.**',
    '!src/lib/**',
    '!src/schemas/**',
    '!**/**.d.ts',
    '!coverage/**',
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/tests/mocks/prisma.ts'],
};
