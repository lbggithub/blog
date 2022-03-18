<template>
	<div class="tool-form"><formItem v-for="item in tool[props.type]" v-model:input="form[item.key]" :title="item.title" /></div>
</template>

<script setup>
import formItem from './formItem.vue'

const props = defineProps({
	type: String
})

const form = reactive({
	url: 'http://',
	title: '',
	desc: ''
})

const tool = ref({
	link: [
		{
			title: '链接地址',
			key: 'url'
		},
		{
			title: '链接标题',
			key: 'title'
		}
	],
	image: [
		{
			title: '图片描述',
			key: 'url'
		},
		{
			title: '图片链接',
			key: 'desc'
		}
	]
})

const getStyle = () => {
	switch (props.type) {
		case 'link':
			return { start: `[${form.title}](${form.url})` }
		case 'image':
			return { start: `![${form.desc}](${form.url})\n` }
	}
}

defineExpose({ getStyle })
</script>

<style lang="scss">
.tool-form {
	padding: 20px;
}
</style>
