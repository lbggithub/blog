<template>
	<div class="bg-editor">
		<!-- 工具栏 -->
		<div class="editor-tools">
			<!-- 操作按钮 -->
			<div @click="undo" class="tool-box">
				<Icon :size="16"><UndoAlt /></Icon>
			</div>
			<div @click="redo" class="tool-box">
				<Icon :size="16"><RedoAlt /></Icon>
			</div>
			<div @click="expand = !expand" class="tool-box divider">
				<Icon :size="16"><ExpandArrowsAlt /></Icon>
			</div>
			<!-- 样式按钮 -->
			<div @click="setStyle(tool)" v-for="tool in tools" class="tool-box">
				<Icon :size="16"><component :is="tool.icon" /></Icon>
				<div v-if="tool.list" class="list-box">
					<span @click.stop="setStyle(item)" v-for="item in tool.list" class="item">{{ item.name }}</span>
				</div>
			</div>
		</div>
		<!-- 编辑区 -->
		<div class="editor-main">
			<textarea
				v-model="input"
				:focus="focus"
				:selection-start="selectionStart"
				:selection-end="selectionEnd"
				@blur="blur"
				class="editor-textarea"
				placeholder="在这里输入正文"
				maxlength="-1"
			/>
			<div v-html="compiledMarkdown" class="markdown-body editor-html"></div>
		</div>
		<modal v-model:show="showModal.show" :title="showModal.title" width="400px" @confirm="confirmModal">
			<toolform v-if="showModal.show" :type="showModal.show" ref="formRef" />
		</modal>
		<!-- 附件库 -->
		<bg-attachment ref="attachmentRef" @select="selected" />
	</div>
</template>

<script setup>
// 迫于找不到合适且兼容 uniapp 的，所以自己写了一个 markdown 编辑器，为了分离出去，我尽量不使用 element 的组件（踩了很多坑的，不容易啊）
import { Icon } from '@vicons/utils'
import { UndoAlt, RedoAlt, ExpandArrowsAlt } from '@vicons/fa'
import markdownIt from 'markdown-it'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownItMath from 'markdown-it-mathjax3'
import { tools } from './toolsJson.js'
import modal from './modal.vue'
import toolform from './toolform.vue'

// 初始化 markdown-it
var md = new markdownIt({
	breaks: true
})
md.use(markdownItSub)
md.use(markdownItSup)
md.use(markdownItMath)

// 操作按钮
const actions = [
	{
		icon: h(UndoAlt),
		action: 'undo'
	}
]

const expand = ref(false) // 全屏控制
const historys = [''] // 操作记录
let index = 0 // 当前操作位置
// 撤回
const undo = () => {
	
}
// 复原
const redo = () => {
	input.value = historys[index]
}

// 选中附件
const attachmentRef = ref()
const selected = item => {
	setStyle({ start: `![${item.name}](${item.url})\n` })
}

// 插入语法和光标
const focus = ref(false)
const selectionStart = ref(-1)
const selectionEnd = ref(-1)
const setStyle = async tool => {
	if (tool.list) {
		return
	}
	if (tool.show) {
		// 展示弹窗
		if (tool.show === 'images') {
			attachmentRef.value.openDrawer(true) // 打开附件库
		} else {
			showModal.value = { ...tool }
		}
		return
	}
	focus.value = true
	await nextTick() // 等待光标生效
	// 获取当前光标位置
	uni.getSelectedTextRange({
		success: async res => {
			focus.value = false // 先隐藏光标，不然会闪一下
			putStyle(tool, res.start, res.end)
			await nextTick()
			putSelection(tool, res.start, res.end)
		},
		fail: err => {
			console.log(err) // 可能是浏览器不支持
		}
	})
}

// 设置光标位置
const putSelection = (tool, start, end) => {
	let count
	if (tool.end) {
		count = start === end ? start + tool.start.length : end + tool.end.length // 双标签
	} else {
		count = start + tool.start.length // 单标签
	}
	// 加个延迟，不然光标会跑到最后
	setTimeout(() => {
		focus.value = true
		selectionStart.value = count
		selectionEnd.value = count
	}, 100)
}

// 在字符串头尾插入 markdown 语法
const putStyle = (tool, start, end) => {
	let text = input.value
	if (tool.end) {
		input.value = text.slice(0, start) + tool.start + text.slice(start, end) + tool.end + text.slice(end)
	} else {
		input.value = text.slice(0, start) + tool.start + text.slice(start)
	}
	historys.push(input.value) // 记录操作
	console.log(historys)
}

// 恢复光标位置
const blur = () => {
	focus.value = false
	selectionStart.value = -1
	selectionEnd.value = -1
}

// 弹窗组件
const showModal = ref({
	show: '',
	title: ''
})
const formRef = ref()
const confirmModal = () => {
	setStyle(formRef.value.getStyle())
}

// 获取 html 内容
const input = ref('') // textarea 输入的值
const compiledMarkdown = computed(() => {
	return md.render(input.value)
})

// 把获取 html 的方法暴露给父组件
const getHtml = () => {
	return compiledMarkdown.value
}
defineExpose({ getHtml })
</script>

<style lang="scss">
$border-style: 1px solid #e6e6e6;
.bg-editor {
	margin-top: 30px;
	border-radius: 2px;
	border: $border-style;
	.editor-tools {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: 5px;
		border-bottom: $border-style;
		.divider {
			margin-right: 10px !important;
			position: relative;
			&::after {
				content: '';
				position: absolute;
				top: 10%;
				right: -6px;
				height: 80%;
				border-right: $border-style;
			}
		}
		.tool-box {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 4px;
			margin: 0 2px;
			padding: 5px 8px;
			position: relative;
			&:hover {
				background-color: #e2e2e2;
				.list-box {
					visibility: visible;
					transition: visibility 0s 0.2s;
				}
			}
			.list-box {
				visibility: hidden;
				position: absolute;
				top: 120%;
				right: -80%;
				width: 80px;
				border-radius: 4px;
				border: $border-style;
				background-color: #ffffff;
				z-index: 99;
				&::after {
					content: '';
					position: absolute;
					top: -20%;
					left: 0;
					width: 100%;
					height: 20%;
					opacity: 0;
				}
				.item {
					display: block;
					width: 100%;
					font-size: 13px;
					padding: 5px 0;
					text-align: center;
					word-break: keep-all;
					color: #222222;
					cursor: pointer;
					&:hover {
						background-color: #e2e2e2;
					}
				}
			}
		}
	}
	.editor-main {
		display: flex;
		.editor-textarea,
		.editor-html {
			width: 50%;
			height: 70vh;
			padding: 10px 20px;
			box-sizing: content-box;
		}
		.editor-textarea {
			font-size: 15px;
			line-height: 20px;
			position: relative;
			&::after {
				content: '';
				position: absolute;
				right: 0;
				top: 0;
				width: 1px;
				height: 100%;
				background: #e2e2e2;
			}
		}
		.editor-html {
			overflow: scroll;
		}
	}
}
</style>
