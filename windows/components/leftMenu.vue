<template>
	<el-menu :default-active="activeKey" @select="handleSelect">
		<el-menu-item v-for="(value, key, index) in menus" :index="key">
			<Icon :size="16"><component :is="value.icon" /></Icon>
			<span class="menu-name">{{ value.label }}</span>
		</el-menu-item>
	</el-menu>
</template>

<script setup>
import { Icon } from '@vicons/utils'
import { menus } from '@/config/menus.js'
const props = defineProps({
	activeKey: String
})
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
		&.is-active,
		&:hover {
			color: #409eff;
			background: rgba($color: #daebff, $alpha: 0.2);
		}
		.menu-name {
			font-size: 15px;
		}
	}
}
.el-menu {
	.xicon {
		margin-right: 10px;
	}
}
</style>
