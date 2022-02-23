<template>
	<view class="container">
		<view class="writing-header">
			<span class="title">{{form.title || '新文章'}}</span>
			<view class="btns">
				<el-button type="warning" @click="submit(2, '保存成功')" :loading="loading">保存草稿</el-button>
				<el-button type="success">预览</el-button>
				<el-button type="primary" @click="showSetting = true">发布</el-button>
				<el-button @click="openAttachment(false)">附件库</el-button>
			</view>
		</view>
		<el-divider />
		<!-- 标题 -->
		<el-input v-model="form.title" placeholder="请输入文章标题" maxlength="30" />
		<!-- 附件 -->
		<bg-attachment ref="attachmentRef" @select="selected" />
		<!-- 内容 -->
		<bg-editor v-model:input="form.content" ref="editorRef" />
		<!-- 设置 -->
		<el-drawer v-model="showSetting" title="文章设置" :size="500" direction="rtl">
			<el-form label-position="top">
				<el-form-item label="发表日期">
					<el-date-picker v-model="form.created_date" type="date" />
				</el-form-item>
				<el-form-item label="摘要">
					<el-input v-model="form.abstract" type="textarea" placeholder="不填写则截取内容前30个字符" />
				</el-form-item>
				<el-form-item label="访问密码">
					<el-input v-model="form.password" placeholder="给你的文章加个密" />
				</el-form-item>
				<el-form-item label="浏览量（为了数据好看点）">
					<el-input-number v-model="form.page_view" :min="0" :step="100" />
				</el-form-item>
				<el-form-item label="排序值（值越大，越靠前）">
					<el-input-number v-model="form.sort" :min="0" />
				</el-form-item>
				<el-form-item label="标签">
					<get-labels v-model:labels="form.labels" />
				</el-form-item>
				<el-form-item label="封面图">
					<span v-if="!form.thumbnail" @click="openAttachment(true)" class="thumbnail-box">点我选择图片</span>
					<el-image v-else @click="openAttachment(true)" :src="form.thumbnail" style="width: 280px;height: 150px;" />
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button type="primary" @click="submit(1, '发布成功')" :loading="loading">确认发布</el-button>
			</template>
		</el-drawer>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import XEUtils from 'xe-utils'
	import getLabels from './components/getLabels.vue'
	import call from '@/utils/call.js'
	import toast from '@/utils/toast.js'
	import password from '@/utils/password.js'

	const showSetting = ref(false)

	const initForm = {
		_id: '',
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
		created_date: new Date(), // 发表日期
	}
	let autoTitle = '' // 标题为空时，以当前时间作为标题
	const form = ref({ ...initForm })

	const editorRef = ref()
	const loading = ref(false)
	const submit = (status, msg) => {
		loading.value = true
		form.value.status = status // 通过按钮传递文章状态
		// 数据处理
		let currentTime = new Date().getTime()
		if (form.value.created_date) {
			form.value.created_date = typeof form.value.created_date === 'object' ? form.value.created_date.getTime() : form.value.created_date // 数据库中存的是时间戳
		} else {
			form.value.created_date = currentTime // 防止时间为空
		}
		form.value.password = form.value.password ? password.encode(form.value.password) : '' // 简单的加密
		if (editorRef.value && form.value.content) {
			form.value.html = editorRef.value.getHtml() // 获取 html 内容
		}
		if (status === 1 && !form.value.abstract) {
			// 提取纯文本，自动生成摘要，草稿状态就不需要了
			let str = form.value.html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
			form.value.abstract = str.substring(0, 30)
		}
		if (form.value.title === autoTitle) {
			autoTitle = `保存于 ${XEUtils.toDateString(currentTime, 'yyyy-MM-dd')}`
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
				autoTitle = ''
				showSetting.value = false
			}
			if (status === 2) {
				form.value._id = res.data.id || form.value._id // 保存草稿，记录返回的id
			}
			toast.success(msg)
		}).catch(() => {
			loading.value = false
		})
	}

	// 选中附件
	const selected = item => {
		form.value.thumbnail = item.url
	}

	// 如果url中带有id，获取文章详情，用于编辑
	onLoad(option => {
		if (option.id) {
			call('getPostDetail', { id: option.id, fidld: { user_id: false } }).then(res => {
				form.value = res.data
			})
		}
	})

	// 获取附件库组件暴露的方法和参数
	const attachmentRef = ref()
	const openAttachment = isSelect => {
		attachmentRef.value.openDrawer(isSelect)
	}
</script>

<style>
	.writing-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 0px 2px;

		.title {
			font-size: 20px;
			line-height: 32px;
			font-weight: 600;
		}

		.btns {
			display: flex;
			height: 40px;

			.el-button {
				margin-left: 8px;
			}
		}
	}

	.thumbnail-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 280px;
		height: 150px;
		border: 1px #F0AD4E dashed;
	}
</style>