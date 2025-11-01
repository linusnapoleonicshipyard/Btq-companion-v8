import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Btq-companion-v8/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
