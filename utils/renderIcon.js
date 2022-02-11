/**
 * 获取图标
 */
import { h } from 'vue'
import { NIcon } from 'naive-ui'

function renderIcon(icon) {
	return () => h(NIcon, null, { default: () => h(icon) }) // h 类似 createElement
}

export default renderIcon
