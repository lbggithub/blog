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
</style>
