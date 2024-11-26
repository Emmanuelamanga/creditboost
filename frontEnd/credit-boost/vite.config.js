import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    port: 5173,
    host: true,
  },
  resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Adjust to point to the root
        },
    },
  
})
