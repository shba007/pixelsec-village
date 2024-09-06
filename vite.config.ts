import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { isCustomElement, transformAssetUrls } from 'vue3-pixi'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        // support for custom elements and remove the unknown element warnings
        compilerOptions: { isCustomElement },
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
        theme_color: '#000000',
        background_color: '#000000',
        orientation: 'landscape',
        icons: [
          {
            src: '/pwa/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
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
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
