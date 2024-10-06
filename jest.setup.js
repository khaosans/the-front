import '@testing-library/jest-dom'
import { jest } from '@jest/globals'

// Add any global mocks or setup here
global.jest = jest;
global.fetch = jest.fn();