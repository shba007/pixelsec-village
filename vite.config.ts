import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { compilerOptions, transformAssetUrls } from 'vue3-pixi'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        // support for custom elements and remove the unknown element warnings
        compilerOptions,
        // support for asset url conversion
        transformAssetUrls,
      },
    }),
    vueDevTools(),
    VitePWA({
      scope: '/',
      base: '/',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Affindi Dataville',
        short_name: 'Dataville',
        description: 'Affindi Dataville',
        theme_color: '#0593FA',
        background_color: '#0593FA',
        orientation: 'landscape',
        icons: [
          /* {
            src: '/pwa/icon-48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa/icon-384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any',
          }, */
          {
            src: '/pwa/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          /* {
            src: '/pwa/icon-maskable-48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa/icon-maskable-384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable',
          }, */
          {
            src: '/pwa/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,css,js,jpg,png,svg,webp,ico}'],
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'NetworkFirst',
          },
        ],
        navigateFallback: undefined,
      },
      devOptions: {
        type: 'module',
        enabled: false,
        suppressWarnings: false,
        navigateFallback: undefined,
      },
    },)
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
