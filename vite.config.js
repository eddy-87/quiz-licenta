import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))

// Aplicație 100% locală — zero API-uri externe.
// `root` este fixat la folderul proiectului ca să meargă indiferent de cwd.
export default defineConfig({
  root,
  plugins: [react()],
  server: { host: true },
  base: './',
})
