<script>
	import { useStore } from 'vuex'
	import authToken from '@/utils/authToken.js'
	export default {
		onLaunch() {
			// 每次打开应用，检查当前页面是否需要登陆
			authToken()
			// 根据屏幕宽度来实时改变左右窗口的样式
			let windowWidth = uni.getSystemInfoSync().windowWidth
			let showWindow = windowWidth < 768
			setWindowStyle(windowWidth)
			uni.onWindowResize((res) => {
				setWindowStyle(res.size.windowWidth)
			})

			function setWindowStyle(width) {
				if (width >= 768 && !showWindow) {
					showWindow = true
					// 展示左边窗口
					uni.setLeftWindowStyle({
						width: '240px',
					})
					uni.$emit('msg', {
						type: 'showLeftMenu',
						data: {
							showMenu: true,
							showCover: false
						}
					})
					// 展示右边窗口
					uni.setRightWindowStyle({
						width: '300px',
					})
					uni.$emit('showRightMenu', {
						showMenu: true,
						showCover: false
					})
				}
				if (width < 768 && showWindow) {
					showWindow = false
					// 隐藏左边窗口
					uni.setLeftWindowStyle({
						width: '0',
					})
					uni.$emit('msg', {
						type: 'showLeftMenu',
						data: {
							showMenu: false,
							showCover: false
						}
					})
					// 隐藏右边窗口
					uni.setRightWindowStyle({
						width: '0',
					})
					uni.$emit('showRightMenu', {
						showMenu: false,
						showCover: false
					})
				}
			}
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
