<template>
	<!-- 附件库-->
	<n-drawer v-model:show="show" width="410px" placement="right" display-directive="show">
		<n-drawer-content title="附件库">
			<!-- 搜索框 -->
			<n-input-group>
				<n-input v-model:value="form.inputValue" placeholder="输入附件名称" />
				<n-button type="primary" ghost @click="search">搜索</n-button>
			</n-input-group>
			<n-divider />
			<!-- 附件列表 -->
			<n-spin :show="form.loading">
				<n-empty v-if="attachments.length === 0" :description="form.loading ? '查找中...' : '什么也没找不到'" size="huge"></n-empty>
				<div v-else class="attachments-box flex-sb">
					<n-image v-for="item in attachments" @click="select(item)" width="176" height="120" :src="item.url" object-fit="cover" preview-disabled />
				</div>
			</n-spin>
			<n-divider />
			<!-- 分页 -->
			<n-pagination v-model:page="form.page" :on-update:page="changePage" :item-count="form.total" :page-size="form.pageSize" />
			<template #footer>
				<!-- 上传附件组件 -->
				<bg-upload @success="initList" />
			</template>
		</n-drawer-content>
	</n-drawer>
	<!-- 附件详情 选择模式下不需要显示详情-->
	<n-drawer v-if="!needSelect" v-model:show="showDetail" width="340px" placement="right">
		<n-drawer-content title="附件详情">
			<n-image width="280" height="150" :src="detail.url" object-fit="contain" class="detail-image" />
			<div v-for="item in detailForm" class="attachment-detail">
				<n-divider />
				<div class="label-box">
					<span vlass="label">{{item.label}}</span>
					<n-icon v-if="item.copy" @click="setClipboardData(item.value)" color="#1890ff">
						<CopyRegular />
					</n-icon>
				</div>
				<span class="value">{{item.value}}</span>
			</div>
			<template #footer>
				<n-popconfirm @positive-click="del">
					<template #trigger>
						<n-button type="error" :loading="deling">删除附件</n-button>
					</template>
					你确定要删除该附件？
				</n-popconfirm>
			</template>
		</n-drawer-content>
	</n-drawer>
</template>

<script setup>
	import { ref } from 'vue'
	import { NDrawer, NDrawerContent, NButton, NSpin, NDivider, NInputGroup, NInput, NEmpty, NImage, NPagination, NPopconfirm, NIcon } from 'naive-ui'
	import { CopyRegular } from '@vicons/fa'
	import dayjs from 'dayjs'
	import call from '@/utils/call.js'
	import toast from '@/utils/toast.js'
	import setClipboardData from '@/utils/setClipboardData.js'

	const emit = defineEmits(['select'])

	// 定义参数
	const form = ref({
		page: 1,
		pageSize: 8,
		total: 0,
		inputValue: '',
		loading: false
	})
	const attachments = ref([]) // 附件列表

	// 获取附件列表
	let init = false
	const getList = () => {
		init = true
		form.value.loading = true
		call('getAttachments', form.value).then(res => {
			attachments.value = res.data.list
			if (form.value.page === 1) {
				form.value.total = res.data.total
			}
			form.value.loading = false
		})
	}

	// 分页
	const changePage = e => {
		form.value.page = e
		getList()
	}

	// 搜索
	const search = () => {
		initList()
	}

	// 初始化列表
	const initList = () => {
		form.value.page = 1
		form.value.total = 0
		attachments.value = []
		getList()
	}

	const showDetail = ref(false)
	const detail = ref({})
	const detailForm = ref([])
	// 点击附件
	const select = item => {
		if (needSelect.value) {
			show.value = false
			emit('select', item)
		} else {
			showDetail.value = true
			detail.value = item
			detailForm.value = [{
				label: '附件名称：',
				value: item.name
			}, {
				label: '附件类型：',
				value: item.type
			}, {
				label: '附件大小：',
				value: `${(item.size / 1000000).toFixed(3)} MB`
			}, {
				label: '上传日期：',
				value: dayjs(item['created_date']).format('YYYY-MM-DD HH:mm')
			}, {
				label: '普通链接：',
				value: item.url,
				copy: true
			}, {
				label: 'Markdown 格式：',
				value: `![${item.name}](${item.url})`,
				copy: true
			}]
		}
	}
	// 删除附件
	const deling = ref(false)
	const del = () => {
		deling.value = true
		call('delAttachments', [detail.value.url]).then(res => {
			toast('删除成功')
			showDetail.value = false
			initList()
			deling.value = false
		})
	}

	// 把打开抽屉的方法暴露给父组件
	const needSelect = ref(false) // 是否开启选择图片模式
	const show = ref(false)
	const openDrawer = e => {
		if (!init) {
			getList()
		}
		needSelect.value = e
		show.value = true
	}
	defineExpose({ openDrawer })
</script>

<style lang="scss">
	.attachments-box {
		flex-wrap: wrap;

		.n-image {
			margin-top: 10px;
		}
	}

	.n-pagination {
		float: right;
	}

	.attachment-detail {
		.label-box {
			display: flex;
			align-items: center;
		}

		.label {
			font-size: 14px;
			font-weight: bold;
		}

		.value {
			margin-top: 4px;
			font-size: 13px;
			word-break: break-all;
			user-select: text;
		}
	}
</style>
