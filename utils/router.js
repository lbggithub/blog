/**
 * 简单的封装 页面跳转
 */
import authToken from '@/utils/authToken.js'

const router = {}

const methods = ['navigateto', 'redirectTo', 'reLaunch', 'switchtab']
methods.forEach((item) => {
	router[item] = (url) => {
		return new Promise((resolve) => {
			uni[item]({
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
})

router.open = url => {
	window.open(url, '_blank')
}

export default router
