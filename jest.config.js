module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['app.js'],
  coverageThreshold: {
    global: { statements: 5, branches: 5, functions: 5, lines: 5 }
  }
};
