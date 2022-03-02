// 改变左右窗口样式

let showWindow = true

function setWindowStyle(width) {
	if (!width) {
		width = uni.getSystemInfoSync().windowWidth
		showWindow = width < 768
	}
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

export default setWindowStyle
