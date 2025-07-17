
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      
      'aef9513c-937a-4182-8fd0-5a193ddd81ed-00-2jzi629rb0cd1.pike.replit.dev'
    ]
  }
})
