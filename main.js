import { createSSRApp } from 'vue'
import App from './App'
import store from './store'

import './static/css/common.css'
// 在js中调用 message 需要引入样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

export function createApp() {
	const app = createSSRApp(App)

	app.use(store)

	return {
		app
	}
}
