import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
const app = createApp(App)
app.use(router)
// app.use(Button)
app.use(Antd)
app.use(store)
app.mount('#app')
