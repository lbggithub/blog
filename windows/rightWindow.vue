<template>
	<view class="right-window"></view>
</template>
<script setup>
	// rightWindow 用于全局调用
	import { useStore } from 'vuex'
	import { ElMessage } from 'element-plus'
	import 'element-plus/es/components/message/style/css'
	
	const store = useStore()
	
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
