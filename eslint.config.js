module.exports = {
  parser: '@typescript-eslint/parser', // Usa parser do TypeScript
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Permite analisar JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Detecta versão do React automaticamente
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'simple-import-sort',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // Deixa prettier rodar junto do eslint
  ],
  rules: {
    // Ajustes de regras (exemplo)
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off', // Com React 17+ não precisa importar React em todos os arquivos
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['src/styles/styled.d.ts'],
      rules: {
        '@typescript-eslint/no-empty-object-type': 'off', // Desativa o aviso só neste arquivo
      },
    },
  ],
};
