
import path from 'node:path'; // 导入path模块

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // base: '/plan-hu/', // github仓库名
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/github': {
        target: 'https://api.github.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github/, ''),
        headers: {
          Authorization: 'Bearer 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',
          Accept: 'application/vnd.github+json'
        }
      }
    }
  }
})
