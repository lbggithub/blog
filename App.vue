<script>
	//#ifdef H5
	import { useStore } from 'vuex'
	//#endif
	export default {
		onLaunch() {
			//#ifdef H5
			const store = useStore()
			const getTheme = matches => {
				if (matches) {
					store.commit('putTheme', 'light')
				} else {
					store.commit('putTheme', 'dark')
				}
			}
			// 获取系统主题
			const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
			// 监听系统主题变化
			themeMedia.addListener(e => {
				getTheme(e.matches)
			})
			const theme = uni.getStorageSync('theme')
			if (!theme) {
				getTheme(themeMedia.matches)
			}
			//#endif
		}
	}
</script>

<style>
	@import 'static/css/common.css';
</style>
