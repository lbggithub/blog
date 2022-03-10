import { h } from 'vue'
import { TachometerAlt, Table, PenSquare, Bars, Tags } from '@vicons/fa'

export const menus = {
	index: {
		label: '控制台',
		page: 'pages/admin/index',
		icon: h(TachometerAlt),
	},
	writing: {
		label: '写文章',
		page: 'pages/admin/writing',
		icon: h(PenSquare)
	},
	posts: {
		label: '文章列表',
		page: 'pages/admin/posts',
		icon: h(Table)
	},
	categorys: {
		label: '分类列表',
		page: 'pages/admin/categorys',
		icon: h(Bars)
	},
	labels: {
		label: '标签库',
		page: 'pages/admin/labels',
		icon: h(Tags)
	},
}
