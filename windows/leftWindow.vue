<template>
	<bg-menu></bg-menu>
</template>

<script setup>
	// 这里是一些全局调用
	import { useStore } from 'vuex'
	import { ElMessage } from 'element-plus'
	// 在窗体里不可以直接访问云函数，所以使用 vuex 来管理
	const store = useStore()
	// 获取分类数据、标签数据
	if (store.state.labels.length + store.state.categorys.length === 0) {
		store.dispatch('getCategorys')
		store.dispatch('getLabels')
	}
	uni.$on('msg', obj => {
		if (obj.type === 'putMenuActiveKey') {
			store.commit('putMenuActiveKey', obj.data)
		}
		if (obj.type === 'ElMessage') {
			ElMessage({
				message: obj.data.message,
				type: obj.data.type,
				duration: 1500
			})
		}
	})
</script>

<style>
</style>
