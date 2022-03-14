<template>
	<div class="bg-editor">
		<textarea :modelValue="props.input" @update:modelValue="emit('update:input', $event)" class="editor-textarea" placeholder="在这里输入正文" maxlength="-1" />
		<div v-html="compiledMarkdown" class="markdown-body editor-html"></div>
	</div>
</template>

<script setup>
// 迫于找不到合适且兼容 uniapp 的，所以自己写了一个 markdown 编辑器（我尽量不使用第三方的UI，方便直接使用）
import { defineAsyncComponent, ref, computed } from 'vue'
import markdownIt from 'markdown-it'
// import hljs from 'highlight.js' // 代码高亮库

// 双向绑定 v-model:input
const props = defineProps({
	input: String
})
const emit = defineEmits(['update:input'])

// 初始化 markdown-it
var md = new markdownIt({
	breaks: true,
	// highlight: function(code, language) {
	// 	if (language && hljs.getLanguage(language)) {
	// 		try {
	// 			return `<pre><code class="hljs language-${language}">` + hljs.highlight(code, { language }).value + '</code></pre>'
	// 		} catch (__) {}
	// 	}
	// 	return '<pre class="hljs"><code>' + md.utils.escapeHtml(code) + '</code></pre>'
	// }
})

// 实时获取 html 内容
const compiledMarkdown = computed(() => {
	return md.render(props.input)
})

// 把获取 html 的方法暴露给父组件
const getHtml = () => {
	return compiledMarkdown.value
}
defineExpose({ getHtml })
</script>

<style lang="scss">
.bg-editor {
	display: flex;
	margin-top: 30px;
	overflow: hidden;
	.editor-textarea,
	.editor-html {
		width: 50%;
		height: 70vh;
		padding: 10px;
		border-radius: 2px;
		box-sizing: content-box;
	}
	.editor-textarea {
		border: 1px solid #e5e7eb;
		font-size: 14px;
		line-height: 20px;
	}
	.editor-html {
		overflow: scroll;
	}
}
</style>
