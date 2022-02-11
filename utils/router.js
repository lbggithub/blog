/**
 * 简单的封装 页面跳转
 */

const router = {}

const methods = ['navigateto', 'redirectto', 'reLaunch', 'switchtab']
methods.forEach((item) => {
	router[item] = (url) => {
		return new Promise((resolve) => {
			uni[item]({
				url: `/pages/${url}/${url}`,
				complete() {
					resolve()
				}
			})
		})
	}
})

export default router
