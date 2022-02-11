<template>
	<div class="writing-wrap">
		<div class="writing-header flex-sb">
			<span class="title">{{form.title || '新文章'}}</span>
			<div class="btns flex">
				<n-button type="warning" @click="submit(2, '保存成功')" :loading="loading">保存草稿</n-button>
				<n-button type="info">预览</n-button>
				<n-button type="primary" @click="showSetting = true">发布</n-button>
				<n-button @click="openAttachment(false)">附件库</n-button>
			</div>
		</div>
		<n-divider />
		<!-- 标题 -->
		<n-input v-model:value="form.title" type="text" placeholder="请输入文章标题" maxlength="50" />
		<!-- 内容 -->
		<bg-editor ref="editorRef" />
		<!-- 设置 -->
		<n-drawer v-model:show="showSetting" width="500px" placement="right" display-directive="show">
			<n-drawer-content title="文章设置">
				<n-form-item label="发表日期">
					<n-date-picker v-model:value="form.created_date" type="date" />
				</n-form-item>
				<n-form-item label="摘要">
					<n-input v-model:value="form.abstract" type="textarea" placeholder="不填写则截取内容前30个字符" />
				</n-form-item>
				<n-form-item label="访问密码">
					<n-input v-model:value="form.password" placeholder="给你的文章加个密" />
				</n-form-item>
				<n-form-item label="浏览量（为了数据好看点）">
					<n-input-number v-model:value="form.page_view" :min="0" :step="100" />
				</n-form-item>
				<n-form-item label="排序值（值越大，越靠前）">
					<n-input-number v-model:value="form.sort" :min="0" />
				</n-form-item>
				<n-form-item label="标签">
					<get-labels ref="labelsRef" />
				</n-form-item>
				<n-form-item label="封面图">
					<div v-if="!form.thumbnail" @click="openAttachment(true)" class="thumbnail-box flex">
						点我选择图片
					</div>
					<n-image v-else @click="openAttachment(true)" width="280" height="150" :src="form.thumbnail" preview-disabled />
				</n-form-item>
				<template #footer>
					<n-button type="primary" @click="submit(1, '发布成功')" :loading="loading">确认发布</n-button>
				</template>
			</n-drawer-content>
		</n-drawer>
		<!-- 附件 -->
		<bg-attachment ref="attachmentRef" @select="selected" />
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { NButton, NInput, NDrawer, NDrawerContent, NFormItem, NDatePicker, NIcon, NInputNumber, NDivider, NImage } from 'naive-ui'
	import getLabels from '../components/getLabels.vue'
	import dayjs from 'dayjs'
	import call from '@/utils/call.js'
	import toast from '@/utils/toast.js'
	import password from '@/utils/password.js'

	const showSetting = ref(false)

	const initForm = {
		id: '',
		title: '', // 标题
		content: '', // 内容
		html: '', // 内容 html 格式
		abstract: '', // 摘要
		labels: [], // 标签
		page_view: 0, // 浏览量
		sort: 0, // 排序值
		thumbnail: '', // 缩略图
		password: '', // 访问密码
		status: 0, // 1:已发布，2:草稿箱，3:已删除
		created_date: new Date().getTime(), // 发表日期
	}
	const form = ref({ ...initForm })
	let autoTitle = '' // 标题为空时，以当前时间作为标题

	const labelsRef = ref()
	const editorRef = ref()
	const loading = ref(false)
	const submit = (status, msg) => {
		loading.value = true
		// 数据处理
		let currentTime = new Date().getTime()
		form.value.status = status
		form.value.password = form.value.password ? password.encode(form.value.password) : '' // 简单的加密
		form.value.created_date = form.value.created_date || currentTime // 防止时间为空
		form.value.labels = labelsRef.value ? labelsRef.value.getSelected() : [] // 获取标签
		if (editorRef.value) {
			form.value.content = editorRef.value.getInutValue() // 获取内容
			form.value.html = editorRef.value.getHtml() // 内容
		}
		if (status === 1 && !form.value.abstract) {
			// 提取纯文本，自动生成摘要
			let str = form.value.html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
			form.value.abstract = str.substring(0, 30)
		}
		if (form.value.title === autoTitle) {
			autoTitle = `更新于 ${dayjs(currentTime).format('YYYY-MM-DD HH:mm:ss')}`
			form.value.title = autoTitle
		} else {
			autoTitle = ''
		}
		// 入库
		call('addPosts', form.value).then(res => {
			loading.value = false
			if (status === 1) {
				// 格式化数据
				form.value = { ...initForm }
				labelsRef.value.clear()
				editorRef.value.clear()
				autoTitle = ''
				showSetting.value = false
			}
			if (status === 2) {
				form.value.id = res.data.id || form.value.id // 保存草稿，记录返回的id
			}
			toast(msg, 'success')
		}).catch(() => {
			loading.value = false
		})
	}

	const selected = item => {
		form.value.thumbnail = item.url
	}
	// 获取附件库组件暴露的方法和参数
	const attachmentRef = ref()
	const openAttachment = e => {
		attachmentRef.value.openDrawer(e)
	}
</script>

<style lang="scss">
	.writing-header {
		padding: 0px 2px;
		flex-wrap: wrap;

		.title {
			font-size: 20px;
			line-height: 32px;
			font-weight: 600;
		}

		.btns {
			height: 40px;

			.n-button {
				margin-left: 8px;
			}
		}
	}

	.n-form-item,
	.n-input-number,
	.n-date-picker {
		width: 100%;
	}

	.thumbnail-box {
		width: 280px;
		height: 150px;
		border: 1px #F0AD4E dashed;
		font-weight: bold;
	}
</style>
