import { createSSRApp } from 'vue'
import App from './App'
import store from './store'

import './static/css/common.css'
// Element Plus 额外提供了一系列类名，用于在某些条件下隐藏元素
import 'element-plus/theme-chalk/display.css'
// 在js中调用 message 需要引入样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

// 主观认为 element 的表格非常不好用，所以我要用 vxe-table
import XEUtils from 'xe-utils'
import {
	VXETable,
	Header,
	Column,
	Icon,
	Pager,
	Table
} from 'vxe-table'

// 自定义全局的格式化处理函数
VXETable.formats.mixin({
	// 格式化日期，默认 yyyy-MM-dd HH:mm
	formatDate({ cellValue }, format) {
		return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm')
	}
})

export function createApp() {
	const app = createSSRApp(App)

	function useTable() {
		app.use(Header)
			// 可选组件
			.use(Column)
			.use(Icon)
			.use(Pager)
			// 安装表格
			.use(Table)
	}

	app.use(store)
	useTable()

	return {
		app
	}
}
