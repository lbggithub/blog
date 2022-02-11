import { createStore } from 'vuex'

const store = createStore({
	state: {
		userInfo: {
			username: '',
		},
		theme: uni.getStorageSync('theme') || 'light'
	},
	mutations: {
		putUserInfo(state, value) {
			state.userInfo = value
		},
		putTheme(state, value) {
			uni.setStorageSync('theme', value)
			state.theme = value
		}
	},
	actions: {}
})

export default store
