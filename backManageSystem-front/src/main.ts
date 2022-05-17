// vue
import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from '@/router/index'
import '@/router/permission'
// pinia
import { createPinia } from 'pinia'
// Element Plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(createPinia()).mount('#app')
