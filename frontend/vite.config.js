import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: {
          vendor: ['bootstrap'],
          utils: [
            './src/utils/api.js',
            './src/utils/validation.js',
            './src/utils/notification.js'
          ],
          scripts: [
            './src/scripts/theme-manager.js',
            './src/scripts/form-manager.js',
            './src/scripts/user-manager.js',
            './src/scripts/navigation-manager.js',
            './src/scripts/scroll-animations.js'
          ]
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5053',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  css: {
    devSourcemap: true
  },
  optimizeDeps: {
    include: ['bootstrap']
  }
});
