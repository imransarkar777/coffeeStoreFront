import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer(),         // Optional: generates stats.html to inspect bundle
    viteCompression(),    // Optional: creates .gz and .br compressed assets
  ],
  build: {
    target: 'esnext',              // Modern JS output
    assetsInlineLimit: 4096,       // Inline small assets (<4KB)
    chunkSizeWarningLimit: 1000,   // Avoid warnings for large chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('sweetalert2')) return 'sweetalert';
            return 'vendor';
          }
        },
      },
    },
  },
});