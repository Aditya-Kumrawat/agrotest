
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
      '3482bcca-ba7b-457d-8c98-8be6866610ed-00-2p3lcntgcsfxn.pike.replit.dev'
    ]
  }
})
