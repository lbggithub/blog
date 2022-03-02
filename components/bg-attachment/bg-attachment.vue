<template>
	<!-- 附件库-->
	<el-drawer v-model="show" title="附件库" :size="380" direction="rtl" destroy-on-close>
		<!-- 搜索框 -->
		<div class="act-search-box">
			<el-input v-model="form.inputValue" placeholder="输入附件名称" @change="search" />
			<el-button>搜索</el-button>
		</div>
		<el-divider />
		<!-- 附件列表 -->
		<div v-loading="form.loading">
			<el-empty v-if="attachments.length === 0" :description="form.loading ? '查找中...' : '什么也没找不到'" :image-size="120"></el-empty>
			<div v-else class="imags-box"><el-image v-for="item in attachments" @click="select(item)" :src="item.url" style="width: 165px; height: 120px;" /></div>
		</div>
		<el-divider />
		<!-- 分页 -->
		<bg-pagination v-model:pagination="pagination" @pageChange="getList" />
		<template #footer>
			<!-- 上传附件组件 -->
			<bg-upload @success="initList" />
		</template>
		<!-- 附件详情 选择模式下不需要显示详情-->
		<el-drawer v-if="!isSelect" v-model="showDetail" title="附件详情" :size="340" direction="rtl" append-to-body>
			<el-image :src="detail.url" :preview-src-list="[detail.url]" style="width: 298px; height: 150px" />
			<div v-for="item in detailForm" class="attachment-detail">
				<el-divider />
				<div class="label-box">
					<span vlass="label">{{ item.label }}</span>
					<el-icon v-if="item.copy" @click="setClipboardData(item.value)" color="#1890ff"><CopyRegular /></el-icon>
				</div>
				<span class="value">{{ item.value }}</span>
			</div>
			<template #footer>
				<el-popconfirm title="你确定要删除该附件？" @confirm="del">
					<template #reference>
						<el-button type="danger" :loading="deling">删除附件</el-button>
					</template>
				</el-popconfirm>
			</template>
		</el-drawer>
	</el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { CopyRegular } from '@vicons/fa'
import dayjs from 'dayjs'
import call from '@/utils/call.js'
import toast from '@/utils/toast.js'
import setClipboardData from '@/utils/setClipboardData.js'

const emit = defineEmits(['select'])

// 定义参数
const form = ref({
	inputValue: '',
	loading: false
})
const pagination = ref({
	currentPage: 1,
	pageSize: 10,
	total: 0
})
const attachments = ref([]) // 附件列表

// 获取附件列表
let init = false
const getList = () => {
	init = true
	form.value.loading = true
	call('getAttachments', {
		...form.value,
		...pagination.value
	}).then(res => {
		attachments.value = res.data.list
		if (pagination.value.currentPage === 1) {
			pagination.value.total = res.data.total
		}
		form.value.loading = false
	})
}

// 搜索
const search = () => {
	initList()
}

// 初始化列表
const initList = () => {
	pagination.value.currentPage = 1
	pagination.value.total = 0
	attachments.value = []
	getList()
}

const showDetail = ref(false)
const detail = ref({})
const detailForm = ref([])
// 点击附件
const select = item => {
	if (isSelect.value) {
		show.value = false
		emit('select', item) // 选择附件，直接返回对象
	} else {
		showDetail.value = true // 打开附件详情
		detail.value = item
		detailForm.value = [
			{
				label: '附件名称：',
				value: item.name
			},
			{
				label: '附件类型：',
				value: item.type
			},
			{
				label: '附件大小：',
				value: `${(item.size / 1000000).toFixed(3)} MB`
			},
			{
				label: '上传日期：',
				value: dayjs(item.created_date).format('YYYY-MM-DD HH:mm')
			},
			{
				label: '普通链接：',
				value: item.url,
				copy: true
			},
			{
				label: 'Markdown 格式：',
				value: `![${item.name}](${item.url})`,
				copy: true
			}
		]
	}
}

// 删除附件
const deling = ref(false)
const del = () => {
	deling.value = true
	call('delAttachments', [detail.value.url]).then(res => {
		toast.success('删除成功')
		showDetail.value = false
		initList()
		deling.value = false
	})
}

// 把打开抽屉的方法暴露给父组件
const isSelect = ref(false) // 是否开启选择图片模式
const show = ref(false)
const openDrawer = val => {
	if (!init) {
		getList()
	}
	isSelect.value = val
	show.value = true
}
defineExpose({ openDrawer })
</script>

<style lang="scss">
.act-search-box {
	display: flex;
	align-items: center;
}
.imags-box {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.el-image {
		margin-top: 10px;
	}
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
