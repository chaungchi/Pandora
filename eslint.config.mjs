// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
  {
    files: ['**/*.vue'], // 针对 Vue 文件的配置
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        uni: 'writable',
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      indent: ['error', 2],
      'vue/multi-word-component-names': 'off',
      quotes: ['error', 'double'],
      semi: ['error', 'always'],
      ...pluginVue.configs['flat/essential'].rules // 合并 pluginVue 的规则
    }
  },
  {
    files: ['**/*.{js,mjs,cjs}'], // 针对 JavaScript 文件的配置
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        uni: 'writable',
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      js: pluginJs
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'no-process-exit': 'off',
      quotes: ['error', 'double'],
      semi: ['error', 'always'],
      ...pluginJs.configs.recommended.rules // 合并 pluginJs 的规则
    }
  },
  {
    ignores: [
      '*.sh',
      '*.md',
      '*.woff',
      '*.ttf',
      '*.yaml',
      '.vscode',
      '.idea',
      'node_modules',
      'dist',
      'public',
      'docs',
      '.husky',
      '.eslintrc.js',
      '!.build',
      '.build/*',
      '!.build/test.js'
    ]
  }
];
