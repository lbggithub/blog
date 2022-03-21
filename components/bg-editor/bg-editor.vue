<template>
	<div class="bg-editor" :class="{ expand: expand, 'only-edit': onlyShow === 'edit', 'only-html': onlyShow === 'html' }">
		<!-- 工具栏 -->
		<div class="editor-tools">
			<!-- 撤回 -->
			<div @click="undo" class="tool-box">
				<Icon :size="16"><UndoAlt /></Icon>
			</div>
			<!-- 复原 -->
			<div @click="redo" class="tool-box divider-r">
				<Icon :size="16"><RedoAlt /></Icon>
			</div>
			<!-- 样式按钮 -->
			<div @click="setStyle(tool)" v-for="tool in tools" class="tool-box">
				<Icon :size="16"><component :is="tool.icon" /></Icon>
				<div v-if="tool.list" class="list-box">
					<span @click.stop="setStyle(item)" v-for="item in tool.list" class="item">{{ item.name }}</span>
				</div>
			</div>
			<!-- 全屏 -->
			<div @click="expand = !expand" class="tool-box divider-l">
				<Icon :size="16"><ExpandArrowsAlt /></Icon>
			</div>
			<!-- 只显示编辑区 -->
			<div @click="changeShow('edit')" class="tool-box">
				<Icon :size="16"><WindowMaximizeRegular /></Icon>
			</div>
			<!-- 只显示 html 区 -->
			<div @click="changeShow('html')" class="tool-box">
				<Icon :size="16"><WindowMaximize /></Icon>
			</div>
		</div>
		<div class="editor-main">
			<!-- 编辑区 -->
			<scroll-view @scroll="scroll" :scroll-top="scrollTop" scroll-y class="editor-textarea">
				<textarea :value="inputValue" :focus="focus" :cursor="cursor" @input="input" @blur="blur" placeholder="在这里输入正文" maxlength="-1" class="textarea" auto-height />
			</scroll-view>
			<!-- 展示区 -->
			<scroll-view @scroll="scroll" :scroll-top="scrollTop" scroll-y class="editor-html"><div v-html="compiledMarkdown" class="markdown-body"></div></scroll-view>
			<!-- 关闭按钮 -->
			<div v-if="onlyShow === 'html'" @click="changeShow('html')" class="close-html">
				<Icon :size="16" color="#666666"><Times /></Icon>
			</div>
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
import { UndoAlt, RedoAlt, ExpandArrowsAlt, WindowMaximizeRegular, WindowMaximize, Times } from '@vicons/fa'
import markdownIt from 'markdown-it'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownItMath from 'markdown-it-mathjax3'
import { tools } from './toolsJson.js'
import modal from './modal.vue'
import toolform from './toolform.vue'

// 初始化 markdown-it
var md = new markdownIt({
	breaks: true,
	html: true
})
md.use(markdownItSub)
md.use(markdownItSup)
md.use(markdownItMath)

const expand = ref(false) // 全屏控制
const onlyShow = ref('') // 只显示编辑区或者 html 区 值：edit / html
// 切换显示模式
const changeShow = value => {
	if (onlyShow.value === value) {
		onlyShow.value = ''
	} else {
		onlyShow.value = value
	}
}

const historys = [] // 操作历史
let index = 0 // 当前操作位置

const inputValue = ref('') // textarea 输入的值
const input = e => {
	inputValue.value = e.detail.value
	putHistory()
}

// 记录操作
const putHistory = () => {
	historys.push(inputValue.value)
	// 防止占用太多内存，只记录10条操作
	index = historys.length - 1
	if (index > 10) {
		historys.shift()
		index--
	}
}
// 撤回
const undo = () => {
	if (index > 0) {
		inputValue.value = historys[index - 1]
		index--
	}
}
// 复原
const redo = () => {
	if (index < historys.length - 1) {
		inputValue.value = historys[index + 1]
		index++
	}
}

// 监听容器滚动，实现同步滚动
let scrollTop = ref(0)
const scroll = (e, type) => {
	scrollTop.value = e.detail.scrollTop
}

// 获取 html 内容
const compiledMarkdown = computed(() => {
	return md.render(inputValue.value)
})

// 插入语法和光标
const focus = ref(false)
const cursor = ref(-1)
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
	setTimeout(async () => {
		focus.value = true
		cursor.value = count
		await nextTick()
		scrollTop.value = scrollTop.value + 0.01 // 还原滚动条位置
	}, 100)
}

// 在字符串头尾插入 markdown 语法
const putStyle = (tool, start, end) => {
	let text = inputValue.value
	if (tool.end) {
		inputValue.value = text.slice(0, start) + tool.start + text.slice(start, end) + tool.end + text.slice(end)
	} else {
		inputValue.value = text.slice(0, start) + tool.start + text.slice(start)
	}
	putHistory()
}

// 恢复光标位置
const blur = () => {
	focus.value = false
	cursor.value = -1
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

// 选中附件
const attachmentRef = ref()
const selected = item => {
	setStyle({ start: `![${item.name}](${item.url})\n` })
}

// 把以下方法暴露给父组件
const setValue = value => {
	inputValue.value = value // 初始化输入值
	putHistory()
}
const getHtml = () => {
	return compiledMarkdown.value // 返回 html 内容
}
const getValue = () => {
	return inputValue.value // 返回输入的内容
}
defineExpose({ setValue, getHtml, getValue })
</script>

<style lang="scss">
$border-style: 1px solid #e6e6e6;
.bg-editor {
	width: 100%;
	height: 80vh;
	margin: 30px 0;
	border-radius: 2px;
	background-color: #ffffff;
	&.only-edit {
		.editor-html {
			display: none;
		}
		.editor-textarea {
			width: 100% !important;
		}
	}
	&.only-html {
		.editor-tools,
		.editor-textarea {
			display: none;
		}
		.editor-html {
			width: 100% !important;
		}
	}
	&.expand {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99999999;
		margin-top: 0;
		height: 100%;
		.editor-textarea,
		.editor-html {
			height: 90vh !important; // 全屏高度
		}
	}
	.editor-tools {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: 5px;
		border: $border-style;
		.divider-l,
		.divider-r {
			position: relative;
			&::after {
				content: '';
				position: absolute;
				top: 15%;
				height: 70%;
				border-right: $border-style;
			}
		}
		.divider-r {
			margin-right: 10px !important;
			&::after {
				right: -6px;
			}
		}
		.divider-l {
			margin-left: 10px !important;
			&::after {
				left: -6px;
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
		position: relative;
		.editor-textarea,
		.editor-html {
			width: 50%;
			height: 70vh; // 编辑区高度
			padding: 10px;
			box-sizing: content-box;
			border: $border-style;
		}
		.editor-textarea {
			font-size: 15px;
			line-height: 20px;
		}
		.markdown-body,
		.textarea {
			width: 100%;
			height: 100%;
		}
	}
	.close-html {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 30px;
		right: 30px;
		width: 26px;
		height: 26px;
		border-radius: 26px;
		background-color: #cccccc;
	}
}
</style>
