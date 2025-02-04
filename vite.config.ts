import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Ensures updates are fetched automatically
      devOptions: {
        enabled: true, // Enable PWA in dev mode (optional)
      },
      manifest: {
        name: 'MY TDL',
        short_name: 'TDL',
        description: 'A simple PWA using Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/arcticons--opentodolist.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/arcticons--opentodolist(1).png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'], // Cache static assets
      },
    }),
  ],
})
