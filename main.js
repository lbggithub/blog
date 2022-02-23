import App from './App'
import store from './store'

import { createSSRApp } from 'vue'

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
