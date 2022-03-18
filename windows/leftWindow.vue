<template>
	<div>
		<!-- 左边菜单 -->
		<div class="left-window" :class="{ hide: !showMenu }"><left-menu :activeKey="activeKey" @select="select" /></div>
		<!-- 抽屉遮罩 -->
		<bg-cover :show="showCover && showMenu" :top="60" @click="showMenu = false" />
	</div>
</template>

<script setup>
import { useStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'
import leftMenu from './components/leftMenu.vue'
// 在窗体里不可以直接访问云函数，所以使用 piana 来管理
const store = useStore()
// 获取分类数据、标签数据
if (store.labels.length + store.categorys.length === 0) {
	store.getCategorys()
	store.getLabels()
}
// 这里是一些全局调用
uni.$on('msg', obj => {
	if (obj.type === 'showLeftMenu') {
		if (showMenu.value && showCover.value) {
			showMenu.value = false // 再次点击，隐藏菜单
		} else {
			showMenu.value = obj.data.showMenu
			showCover.value = obj.data.showCover
		}
	}
	if (obj.type === 'putLeftMenuActiveKey') {
		activeKey.value = obj.data
	}
	if (obj.type === 'ElMessage') {
		ElMessage({
			message: obj.data.message,
			type: obj.data.type,
			duration: 1500
		})
	}
})

const showMenu = ref(false)
const showCover = ref(false)
const activeKey = ref('')

const select = () => {
	if (showCover.value) {
		showMenu.value = false
	}
}
</script>

<style lang="scss">
.left-window {
	z-index: 333;
	position: fixed;
	top: 60px;
	left: 0;
	transition: left 0.2s ease;
	overflow: scroll;

	&.hide {
		left: -240px;
	}
}
</style>
