import { createSSRApp } from 'vue'
import App from './App'
import { createPinia } from 'pinia'

import './static/css/common.css'
// github markdown 样式
import 'github-markdown-css/github-markdown-light.css'
// import 'highlight.js/styles/github.css'
// 在js中调用 message 需要引入样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

export function createApp() {
	const app = createSSRApp(App)

	// pinia 比起 vuex 更轻量级
	app.use(createPinia())

	return {
		app
	}
}
