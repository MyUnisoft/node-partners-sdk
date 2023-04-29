module.exports =
{
  name: "UT",
  displayName: "Unit Testing",
  preset: "ts-jest",
  setupFilesAfterEnv: [
    "./jest.setup.js"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.ts"
  ],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  testMatch: [
    "**/test/**/*.spec.ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/fixtures/"
  ]
};
