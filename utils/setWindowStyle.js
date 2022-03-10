// 改变左右窗口样式

let showWindow = true // 防止多次调用
const showObj = {
	showMenu: true,
	showCover: false
}
const hideObj = {
	showMenu: false,
	showCover: false
}

function setWindowStyle(width) {
	// 无入参，获取当前屏幕宽度
	if (!width) {
		width = uni.getSystemInfoSync().windowWidth
		showWindow = width < 768
	}
	// 大于 768 显示左右窗口
	if (width >= 768 && !showWindow) {
		showWindow = true
		uni.$emit('msg', {
			type: 'showLeftMenu',
			data: showObj
		})
		uni.$emit('setRightStyle', {
			type: 'showRightMenu',
			data: showObj
		})
	}
	// 小于 768 隐藏左右串口
	if (width < 768 && showWindow) {
		showWindow = false
		uni.$emit('msg', {
			type: 'showLeftMenu',
			data: hideObj
		})
		uni.$emit('setRightStyle', {
			type: 'showRightMenu',
			data: hideObj
		})
	}
}

export default setWindowStyle
