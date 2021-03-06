import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.json'],
  },
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [
          path.resolve(__dirname, 'src/assets/styles/utils/_variables'),
          path.resolve(__dirname, 'src/assets/styles/utils/_mixins'),
        ],
      },
    },
  },
});
