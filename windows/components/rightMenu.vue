<template>
	<el-menu :default-active="props.activeKey" @select="handleSelect">
		<template v-for="menu in menus">
			<el-menu-item v-if="menu.name !== '分类'" :index="menu.name">
				<el-icon><component :is="menu.icon" /></el-icon>
				<span class="menu-name">{{ menu.name }}</span>
			</el-menu-item>
			<el-sub-menu v-else-if="store.state.categorys.length > 0" :index="menu.name">
				<template #title>
					<el-icon><component :is="menu.icon" /></el-icon>
					<span class="menu-name">{{ menu.name }}</span>
				</template>
				<el-menu-item v-for="category in store.state.categorys" :index="category.name">
					<span class="menu-name">{{ category.name }}</span>
				</el-menu-item>
			</el-sub-menu>
		</template>
	</el-menu>
</template>

<script setup>
import { h, ref } from 'vue'
import { useStore } from 'vuex'
import { FortAwesomeAlt, GrinTongueWink, Megaport } from '@vicons/fa'
import router from '@/utils/router.js'

const props = defineProps({
	activeKey: {
		type: String,
		default: '首页'
	}
})
const emit = defineEmits(['select'])

const store = useStore()

const menus = [
	{
		name: '首页',
		icon: h(FortAwesomeAlt)
	},
	{
		name: '日志',
		icon: h(GrinTongueWink)
	},
	{
		name: '分类',
		icon: h(Megaport)
	}
]

const handleSelect = key => {
	emit('select')
	router.redirectTo(`index/index?c=${key}`)
}
</script>

<style lang="scss">
.el-menu-item {
	&.is-active,
	&:hover {
		color: #409eff;
		background: rgba($color: #daebff, $alpha: 0.2);
	}
	.menu-name {
		font-size: 15px;
	}
}
</style>
