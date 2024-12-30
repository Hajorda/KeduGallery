import { defineConfig } from 'vite';

export default defineConfig({
  base: '/KeduGallery/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 500, // Adjust the chunk size warning limit if needed
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into a separate chunk
          vendor: ['three'],
        },
      },
    },
  },
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
});