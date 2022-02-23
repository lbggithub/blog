<script>
	import { useStore } from 'vuex'
	import authToken from '@/utils/authToken.js'
	export default {
		onLaunch() {
			// 每次打开应用，检查当前页面是否需要登陆
			authToken()
		},
		onPageNotFound() {
			// 不存在的路由，跳转到404
			uni.redirectTo({
				url: '/pages/error/404'
			})
		},
	}
</script>

<style>
	@import 'static/css/common.css';
	/* Element Plus 额外提供了一系列类名，用于在某些条件下隐藏元素 */
	@import 'element-plus/theme-chalk/display.css';
</style>
