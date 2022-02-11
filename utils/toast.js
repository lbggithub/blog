function toast(title, icon = 'none', duration = 2000) {
	uni.showToast({
		title,
		icon: icon || 'none',
		duration: duration || 2000
	})
}

toast.hide = () => {
	uni.hideToast()
}

toast.loading = (title = '加载中') => {
	uni.showLoading({
		title
	})
}

toast.hideLoading = () => {
	uni.hideLoading()
}

export default toast
