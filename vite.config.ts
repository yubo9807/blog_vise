import vuePlugin from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import path from 'path';
import env from './env_variable';

export default defineConfig({
	plugins: [
    vuePlugin(),
  ],
	alias: {
    // 键必须以斜线开始和结束
    '@': path.resolve(__dirname, './src'),
    '~': path.resolve(__dirname)
  },
  base: env.BASE_ROUTE_URL,
  server: {
    open: false,
    port: 3000,
  },
  build: {
    outDir: 'vise',
    minify: false,
  }
})
