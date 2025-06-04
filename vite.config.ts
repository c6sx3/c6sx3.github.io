import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/c6sx3.github.io/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
