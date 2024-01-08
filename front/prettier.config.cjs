// prettier-ignore
const config = {
  arrowParens: 'always',
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: 'all',
  tabWidth: 2,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ],
  tailwindConfig: './tailwind.config.js',
  importOrder: [
    '^react$',
    '^[^\\.]+$',
    '',
    '^\\.{2}(.*)$',
    '^\\.{1}(.*)$',
    '^(.*)$'
  ],
};

module.exports = config;
