/**
 * 设置系统剪贴板的内容
 */
import toast from '@/utils/toast.js'

function setClipboardData(content) {
	// #ifdef H5
	const textString = content.toString()
	let input = document.querySelector('#copy-input')
	if (!input) {
		input = document.createElement('input')
		input.id = 'copy-input'
		input.readOnly = 'readOnly' // 防止ios聚焦触发键盘事件
		input.style.position = 'absolute'
		input.style.left = '-1000px'
		input.style.zIndex = '-1000'
		document.body.appendChild(input)
	}
	input.value = textString
	// ios必须先选中文字且不支持 input.select()
	if (input.createTextRange) { // ie
		const range = input.createTextRange()
		range.collapse(true)
		range.moveStart('character', 0) // 起始光标
		range.moveEnd('character', textString.length - 0) // 结束光标
		range.select() // 不兼容苹果
	} else { // firefox/chrome
		input.setSelectionRange(0, textString.length)
		input.focus()
	}
	if (document.execCommand('copy')) {
		document.execCommand('copy')
		toast('内容已复制')
	} else {
		toast('该浏览器不支持', 'error')
	}
	input.blur()
	// #endif

	// #ifndef H5
	uni.setClipboardData({
		data: content
	})
	// #endif
}

export default setClipboardData
