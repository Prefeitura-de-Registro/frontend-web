import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'nome do app por extenso',
        short_name: ' nome do app abreviado',
        theme_color: '#2563eb',
        icons: [
          { 
            src: 'icon-example.png', 
            sizes: '192x192', 
            type: 'image/png' },
          { 
            src: 'icon-example.png', 
            sizes: '512x512', 
            type: 'image/png' },
        ],
      },
    }),
  ],
})
