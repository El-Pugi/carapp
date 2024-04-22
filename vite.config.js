import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Environment } from 'ag-grid-community'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/carapp',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
