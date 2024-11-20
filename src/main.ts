import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/css/style.css'

let app: any

function mountApp() {
  app = createApp(App)
  app.use(createPinia())
  app.mount('#app')
}

function unmountApp() {
  if (app) app.unmount()
}

export function resetApp() {
  unmountApp()
  mountApp()
}

mountApp()
