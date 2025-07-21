import pluginVue from 'eslint-plugin-vue'
import prettierConfig from '@vue/eslint-config-prettier'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  prettierConfig,
  {
    ignores: ['./vscode/**', './node_modules/**', './dist/**'],
    rules: {
      'vue/html-self-closing': 'off',
    },
  },
]
