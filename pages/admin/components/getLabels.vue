<template>
	<el-select
		:modelValue="props.labels"
		@update:modelValue="updateValue"
		multiple
		filterable
		allow-create
		default-first-option
		:reserve-keyword="false"
		placeholder="选择或输入标签"
	>
		<el-option v-for="item in optionsLables" :label="item" :value="item" />
	</el-select>
</template>

<script setup>
import { useStore } from '@/stores/index.js'

const store = useStore()

// 双向绑定 v-model:labels
const props = defineProps({
	labels: Array
})
const emit = defineEmits(['update:labels'])
const updateValue = labels => {
	emit('update:labels', labels) // 更新父组件绑定的值
	// 监听参数变化，判断是否需要标签入库
	let lastVal = labels[labels.length - 1]
	if (lastVal && optionsLables.value.indexOf(lastVal) === -1) {
		call('addLabel', { name: lastVal }).then(res => {
			optionsLables.value.push(lastVal)
			toast.success(`${lastVal} 标签成功记录入库`)
			store.getLabels() // 刷新标签库
		})
	}
}

const optionsLables = ref([]) // 获取库中的标签
optionsLables.value = store.labels.map(i => {
	return i.name
})
</script>

<style>
.el-select {
	width: 100%;
}
</style>
