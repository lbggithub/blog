<script>
import authToken from '@/utils/authToken.js'
import setWindowStyle from '@/utils/setWindowStyle.js'
export default {
	onLaunch() {
		// 每次打开应用，检查当前页面是否需要登陆
		authToken()
		// 根据屏幕宽度来实时改变左右窗口的样式
		setWindowStyle()
		uni.onWindowResize(res => {
			setWindowStyle(res.size.windowWidth)
		})
	},
	onPageNotFound() {
		// 不存在的路由，跳转到404
		uni.redirectTo({
			url: '/pages/error/404'
		})
	}
}
</script>

<style></style>
