import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pinned off Vite's 5173 default: another project's dev server on this machine
  // also uses the default port, and port collisions between the two were causing
  // this app's own verification runs to silently hit the other project instead.
  server: { port: 5190, strictPort: true },
})
