import App from './App'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

export function createApp() {
	const app = createSSRApp(App)

	// pinia 比起 vuex 更轻量级
	app.use(createPinia())

	return {
		app
	}
}
