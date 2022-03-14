import { createSSRApp } from 'vue'
import App from './App'
// import store from './store'
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

	// app.use(store)

	app.use(createPinia())

	return {
		app
	}
}
