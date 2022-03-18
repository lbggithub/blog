<template>
	<el-menu :default-active="props.activeKey" @select="handleSelect">
		<template v-for="menu in menus">
			<el-menu-item v-if="menu.name !== '分类'" :index="menu.name">
				<Icon :size="16"><component :is="menu.icon" /></Icon>
				<span class="menu-name">{{ menu.name }}</span>
			</el-menu-item>
			<el-sub-menu v-else-if="store.categorys.length > 0" :index="menu.name">
				<template #title>
					<Icon :size="16"><component :is="menu.icon" /></Icon>
					<span class="menu-name">{{ menu.name }}</span>
				</template>
				<el-menu-item v-for="category in store.categorys" :index="category.name">
					<span class="menu-name">{{ category.name }}</span>
				</el-menu-item>
			</el-sub-menu>
		</template>
	</el-menu>
</template>

<script setup>
import { Icon } from '@vicons/utils'
import { useStore } from '@/stores/index.js'
import { FortAwesomeAlt, GrinTongueWink, Megaport } from '@vicons/fa'

const props = defineProps({
	activeKey: String
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
	router.redirectTo(`index/index?category=${key}`)
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
.el-menu {
	.xicon {
		margin-right: 10px;
	}
}
</style>
