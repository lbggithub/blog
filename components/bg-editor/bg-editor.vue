<template>
	<view class="bg-editor">
		<textarea v-model="input" class="editor-textarea" placeholder="在这里输入正文" maxlength="-1" />
		<component :is="themeComponent">
			<view v-html="compiledMarkdown"></view>
		</component>
	</view>
</template>

<script setup>
	// 迫于找不到合适且兼容 uniapp 的，所以自己写了一个 markdown 编辑器（尽量不使用第三方的UI，方便别人直接使用）
	import { defineAsyncComponent, ref, computed } from 'vue'
	import { useStore } from 'vuex'
	import markdownIt from 'markdown-it'
	import 'github-markdown-css/github-markdown.css'

	// 为了兼容黑夜模式
	const store = useStore()
	const themeComponent = computed(() => {
		return store.state.theme === 'dark' ? defineAsyncComponent(() => import(`./github-markdown-dark.vue`)) : defineAsyncComponent(() => import(`./github-markdown-light.vue`))
	})
	var md = new markdownIt().set({
		breaks: true
	})
	const input = ref('')

	const compiledMarkdown = computed(() => {
		return md.render(input.value)
	})

	const getInutValue = () => {
		return input.value
	}
	const getHtml = () => {
		return compiledMarkdown.value
	}
	const clear = () => {
		input.value = ''
	}
	defineExpose({ getInutValue, getHtml, clear }) // 把获取输入值的方法暴露给父组件
</script>

<style lang="scss">
	.bg-editor {
		display: flex;
		margin-top: 30px;

		.editor-textarea,
		.markdown-body {
			width: 50%;
			height: 70vh;
			padding: 10px 20px;
			border-radius: 2px;
			box-sizing: content-box;
		}

		.editor-textarea {
			border: 1px solid #999999;
			font-size: 16px;
			line-height: 20px;
		}

		.markdown-body {
			overflow: scroll;
		}
	}
</style>
