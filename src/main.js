import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router/index'
import ElementPlus from 'element-plus/es'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: 'large', zIndex: 3000 })
app.mount('#app')