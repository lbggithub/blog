import { createStore } from 'vuex'
import call from '@/utils/call.js'
import router from '@/utils/router.js'
import toast from '@/utils/toast.js'

const userInfo = { username: '' } // 定义用户信息

const store = createStore({
	state: {
		userInfo: uni.getStorageSync('userInfo') || { ...userInfo },
		categorys: uni.getStorageSync('categorys') || [],
		labels: uni.getStorageSync('labels') || []
	},
	mutations: {
		putUserInfo(state, value) {
			state.userInfo = value
			uni.setStorageSync('userInfo', value)
		},
		clearToken(state, msg) {
			toast.success(msg)
			state.userInfo = { ...userInfo }
			uni.removeStorageSync('uni_id_token')
			uni.removeStorageSync('uni_id_token_expired')
			router.reLaunch('admin/login')
		},
		putCategorys(state, value) {
			state.categorys = value
			uni.setStorageSync('categorys', value)
		},
		putLabels(state, value) {
			state.labels = value
			uni.setStorageSync('labels', value)
		}
	},
	actions: {
		resetPwd({ commit }, value) {
			return new Promise((resolve) => {
				call('resetPwd', { password: value }).then(() => {
					commit('clearToken', '密码修改成功，需要重新登陆')
					resolve()
				}).catch(() => {
					resolve()
				})
			})
		},
		logout({ commit }) {
			// 注销登陆 清除本地缓存
			call('logout').then(() => {
				commit('clearToken', '登出成功')
			})
		},
		getCategorys({ commit }) {
			commit('putCategorys', [])
			call('getCategorys').then(res => {
				commit('putCategorys', res.data)
			})
		},
		getLabels({ commit }) {
			commit('putLabels', [])
			call('getLabels').then(res => {
				commit('putLabels', res.data)
			})
		}
	}
})

export default store
