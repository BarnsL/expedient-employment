import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  css: { postcss: { plugins: [tailwindcss()] } },
  build: {
    outDir: '../crew/expedient-employment/ui',
    emptyOutDir: false,
    lib: { entry: 'src/crew/CrewApp.tsx', formats: ['es'], fileName: () => 'index.mjs' },
    rollupOptions: { external: ['react', 'react/jsx-runtime', 'react-dom', '@codexcrew/app-sdk'] },
  },
});
