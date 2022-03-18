/**
 * 简单的封装 页面跳转
 */
import authToken from '@/utils/authToken.js'

export const router = {
	open: url => {
		window.open(url, '_blank')
	},
	navigateTo: url => {
		return new Promise((resolve) => {
			uni.navigateTo({
				url: `/pages/${url}`,
				complete() {
					resolve()
				},
				success() {
					authToken() // 判断页面是否需要登陆
				},
				fail(err) {
					console.log(err)
				}
			})
		})
	},
	redirectTo: url => {
		return new Promise((resolve) => {
			uni.redirectTo({
				url: `/pages/${url}`,
				complete() {
					resolve()
				},
				success() {
					authToken() // 判断页面是否需要登陆
				},
				fail(err) {
					console.log(err)
				}
			})
		})
	},
	reLaunch: url => {
		return new Promise((resolve) => {
			uni.reLaunch({
				url: `/pages/${url}`,
				complete() {
					resolve()
				},
				success() {
					authToken() // 判断页面是否需要登陆
				},
				fail(err) {
					console.log(err)
				}
			})
		})
	}
}