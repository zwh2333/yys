import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

// 引入样式文件
import '@/styles/common.css'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
