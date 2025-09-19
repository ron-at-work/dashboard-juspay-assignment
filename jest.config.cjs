/** @type {import('jest').Config} */
module.exports = {
  // Test environment
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Module name mapping for CSS and assets
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    // Mock validation module
    '^../utils/validation$': '<rootDir>/__mocks__/validation.js',
    '^../../src/utils/validation$': '<rootDir>/__mocks__/validation.js',
    '^src/utils/validation$': '<rootDir>/__mocks__/validation.js',
  },
  
  // Test file patterns
  testMatch: [
    '<rootDir>/__tests__/**/*.test.{js,jsx}',
    '<rootDir>/src/**/__tests__/**/*.test.{js,jsx}',
  ],
  
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/*.stories.{js,jsx}',
    '!src/main.jsx',
    '!src/vite-env.d.ts',
  ],
  
  // Coverage thresholds for 100% coverage
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  
  // Coverage reporters
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'json'],
  
  // Test timeout
  testTimeout: 10000,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks between tests
  restoreMocks: true,
  
  // Verbose output
  verbose: true,
};
