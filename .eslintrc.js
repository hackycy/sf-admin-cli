module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 8
  },
  rules: {
    quotes: [2, 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never']
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
