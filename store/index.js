import { createStore } from 'vuex'
import call from '@/utils/call.js'
import router from '@/utils/router.js'
import toast from '@/utils/toast.js'

const userInfo = { username: '' } // 定义用户信息

const store = createStore({
	state: {
		menuActiveKey: '',
		userInfo: uni.getStorageSync('userInfo') || { ...userInfo },
		categorys: [],
		labels: []
	},
	mutations: {
		putMenuActiveKey(state, value) {
			state.menuActiveKey = value
		},
		putUserInfo(state, value) {
			state.userInfo = value
			uni.setStorageSync('userInfo', value)
		},
		initToken(state, msg) {
			toast.success(msg)
			state.userInfo = { ...userInfo }
			uni.removeStorageSync('uni_id_token')
			uni.removeStorageSync('uni_id_token_expired')
			router.reLaunch('admin/login')
		},
		putCategorys(state, value) {
			state.categorys = value
		},
		putLabels(state, value) {
			state.labels = value
		}
	},
	actions: {
		resetPwd({ commit }, value) {
			return new Promise((resolve) => {
				call('resetPwd', { password: value }).then(() => {
					commit('initToken', '密码修改成功，需要重新登陆')
					resolve()
				}).catch(() => {
					resolve()
				})
			})
		},
		logout({ commit }) {
			// 注销登陆 清除本地缓存
			call('logout').then(() => {
				commit('initToken', '登出成功')
			})
		},
		getCategorys({ commit }) {
			call('getCategorys').then(res => {
				commit('putCategorys', res.data)
			})
		},
		getLabels({ commit }) {
			call('getLabels').then(res => {
				commit('putLabels', res.data)
			})
		}
	}
})

export default store
