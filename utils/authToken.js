/**
 * toekn 判断
 */
import tryGetCurrentPage from '@/utils/tryGetCurrentPage.js'
import { menus } from '@/config/menus.js'

const loginPage = 'pages/admin/login' // 登陆页不需要判断

async function authToken() {
	let currentPage = await tryGetCurrentPage()
	if (currentPage === null) {
		authToken()
		return
	}
	let tokenExpired = uni.getStorageSync('uni_id_token_expired') || 0
	// 路径包含 admin 的页面需要判断是否登陆
	if (currentPage.indexOf('pages/admin/') > -1 && currentPage !== loginPage) {
		// 无用户信息，或者 token 过期，直接去登陆
		if (new Date().getTime() > tokenExpired) {
			tokenExpired = null
			uni.reLaunch({
				url: `/${loginPage}?from=${currentPage}`
			})
		}
		// 如果是菜单页，激活样式
		let keys = currentPage.split('/')
		let key = keys[keys.length - 1]
		if (menus[key]) {
			uni.$emit('msg', {
				type: 'putLeftMenuActiveKey',
				data: key
			})
		}
	}
}

export default authToken
