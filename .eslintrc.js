module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es6: true
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
