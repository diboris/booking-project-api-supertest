module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest': true,
    'commonjs': true,
    'jest/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:jest/style'
  ],
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error'
  },
  'globals': {
    'BASE_URL': 'readonly',
    'COMMON_HEADERS': 'readonly',
    'JSON_CONTENT_TYPE': 'readonly',
    'TEXT_PLAIN_CONTENT_TYPE': 'readonly'
  }
}
