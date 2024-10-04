const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  preset: 'ts-jest', // Add this line to use ts-jest
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'], // Ensure this points to the correct file
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)