import { createApp } from 'vue'
import '@/assets/css/style.css'
import router from '@/router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .mount('#app')
