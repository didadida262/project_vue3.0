/*
 * @Author: Hhvcg
 * @Date: 2022-02-16 18:13:14
 * @LastEditors: -_-
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(store)
app.mount('#app')

// 子组件错误处理钩子
// app.config.errorHandler = (err) => {
//   /* 处理错误 */
// }

// 挂在公共组件
// app.component('TodoDeleteButton', TodoDeleteButton)
