const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'], // Ensure this matches the setup file
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)