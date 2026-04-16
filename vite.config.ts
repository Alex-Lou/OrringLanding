import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/OrringLanding/',
  build: {
    // Pas de source maps en production → code impossible à reconstruire proprement
    sourcemap: false,
    // Minification agressive
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,    // retire tous les console.log
        drop_debugger: true,   // retire les debugger
        passes: 2,             // passe le minifier 2x pour optimiser
      },
      mangle: {
        toplevel: true,        // raccourcit aussi les noms au top-level
      },
      format: {
        comments: false,       // retire tous les commentaires
      },
    },
  },
})
