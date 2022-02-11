<template>
	<n-dynamic-tags v-model:value="selectedLabels">
		<template #input>
			<n-auto-complete size="small" :options="options" v-model:value="inputValue" clear-after-select blur-after-select @select="select($event)" @blur="blur" />
		</template>
		<template #trigger="{ activate, disabled }">
			<n-button size="small" @click="activate()" type="primary" dashed :disabled="disabled">添加</n-button>
		</template>
	</n-dynamic-tags>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { NDynamicTags, NAutoComplete, NButton } from 'naive-ui'
	import call from '@/utils/call.js'
	import toast from '@/utils/toast.js'

	const inputValue = ref('')
	let selectedLabels = ref([]) // 当前选中的标签列表
	let lables = [] // 标签库

	// 	获取库中的标签
	call('getLabels').then(res => {
		lables = res.data.map(i => {
			return i.name
		})
	})

	const blur = () => {
		if (inputValue.value) {
			let value = inputValue.value
			inputValue.value = ''
			if (!select(value)) {
				// 判断库中是否存在
				let notDataBase = lables.some(i => {
					return i === value
				})
				// 入库操作
				if (!notDataBase) {
					call('addLabel', { name: value }).then(res => {
						lables.push(value)
						toast(`${value} 标签已入库`, 'success')
					})
				}
			}
		}
	}

	const select = (value) => {
		// 判断标签是否重复添加了
		let notInArr = selectedLabels.value.some(i => {
			return i === value
		})
		if (notInArr) {
			toast('该标签已经添加', 'error')
		} else {
			selectedLabels.value.push(value) // 新的标签，加到选中数组中
		}
		return notInArr
	}

	// 从库中获取到所有标签，做个简单的输入提示（总觉得有更好的方式，嫌太麻烦了，先不弄）
	const options = computed(() => {
		if (inputValue.value) {
			let data = []
			lables.forEach(i => {
				if (i.indexOf(inputValue.value) > -1) {
					data.push(i)
				}
			})
			return data.length > 0 ? data : lables
		}
	})

	const getSelected = () => {
		return selectedLabels.value
	}
	const clear = () => {
		selectedLabels.value = []
	}
	defineExpose({ getSelected, clear })
</script>

<style>

</style>
