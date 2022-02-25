<template>
	<el-checkbox-group :modelValue="props.categorys" @update:modelValue="emit('update:categorys', $event)">
		<el-checkbox v-for="item in store.state.categorys" :label="item.name" size="large" />
	</el-checkbox-group>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'
	import call from '@/utils/call.js'

	const store = useStore() // 获取分类库中的分类

	// 双向绑定 v-model:categorys
	const props = defineProps({
		categorys: Array
	})
	const emit = defineEmits(['update:categorys'])
</script>

<style>
</style>
