import { defineConfigWithVueTs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  ...pluginVue.configs['flat/essential'], // 自定义规则配置
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      // 基本的代码格式和一致性规则，确保代码整洁
      semi: ['error', 'always'], // 强制分号
      quotes: ['error', 'single'], // 强制使用单引号
      'no-console': ['off'], // 禁止使用 console.log，除非是警告
      'no-debugger': 'warn', // 禁止 debugger
      '@typescript-eslint/no-explicit-any': 'warn', // 警告使用 any 类型
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }], // 警告未使用的变量
    },
  },

  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  skipFormatting
)
