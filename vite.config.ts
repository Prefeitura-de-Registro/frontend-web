import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

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
