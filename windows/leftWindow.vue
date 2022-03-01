<template>
	<view class="left-window" :class="{ hide: !showMenu }">
		<!-- 左边菜单 -->
		<left-menu :activeKey="activeKey" @select="select" />
		<div v-if="showCover && showMenu" @click="showMenu = false" class="cover"></div>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'
	import { ElMessage } from 'element-plus'
	import leftMenu from './components/leftMenu.vue'
	// 在窗体里不可以直接访问云函数，所以使用 vuex 来管理
	const store = useStore()
	// 获取分类数据、标签数据
	if (store.state.labels.length + store.state.categorys.length === 0) {
		store.dispatch('getCategorys')
		store.dispatch('getLabels')
	}
	// 这里是一些全局调用
	uni.$on('msg', obj => {
		if (obj.type === 'showLeftMenu') {
			showMenu.value = obj.data.showMenu
			showCover.value = obj.data.showCover
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
		z-index: 999;
		position: fixed;
		top: 60px;
		left: 0;
		transition: left .2s ease;

		&.hide {
			left: -240px;
		}

		.cover {
			position: absolute;
			top: 0;
			left: 240px;
			width: 100vw;
			height: 100vh;
			background-color: rgba($color: #000000, $alpha: 0.3);
		}
	}
</style>
