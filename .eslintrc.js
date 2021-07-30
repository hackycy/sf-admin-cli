'use strict'

module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es6: true,
    commonjs: true
  },
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    quotes: [2, 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    strict: ['error', 'global']
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js'],
      env: {
        jest: true
      },
      rules: {
        'node/no-extraneous-require': 'off'
      }
    }
  ]
}
