import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(react-hook-form)/)'],     
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

export default config;

