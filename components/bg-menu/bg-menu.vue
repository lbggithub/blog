<template>
	<el-menu :default-active="store.state.menuActiveKey" @select="handleSelect">
		<el-menu-item v-for="(value, key, index) in menus" :index="key">
			<el-icon>
				<component :is="value.icon" />
			</el-icon>
			<span>{{value.label}}</span>
		</el-menu-item>
	</el-menu>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'
	import { menus } from '@/config/menus.js'
	import router from '@/utils/router.js'

	const store = useStore()

	const emit = defineEmits(['select'])

	const handleSelect = key => {
		router.redirectTo(`admin/${key}`)
		emit('select')
	}
</script>

<style lang="scss">
	.el-menu {
		width: 240px;
		height: calc(100vh - (var(--top-window-height)));

		.el-menu-item {
			padding-left: 40px !important;

			&:hover {
				color: #409eff; // element-css 变量：https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss 
				background: none;
			}

			&.is-active {
				background: #ecf5ff;
			}
		}
	}
</style>
