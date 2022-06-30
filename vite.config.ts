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
    chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) { // 分包
            if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
  }
})
