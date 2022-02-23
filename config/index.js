import { h } from 'vue'
import { GrinTongueWink, Table, PenSquare } from '@vicons/fa'

export default {
	menus: {
		index: {
			label: '首页',
			page: 'pages/admin/index',
			icon: h(GrinTongueWink),
		},
		posts: {
			label: '文章列表',
			page: 'pages/admin/posts',
			icon: h(Table)
		},
		writing: {
			label: '写文章',
			page: 'pages/admin/writing',
			icon: h(PenSquare)
		},
	}
}
