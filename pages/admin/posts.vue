<template>
	<div class="container">
		<div class="tools">
			<el-button v-if="isDel" @click="setIsDel(false)">返回</el-button>
			<el-button v-else @click="setIsDel(true)" type="warning">打开回收站</el-button>
			<el-button @click="del(null)" type="danger">删除选中</el-button>
		</div>
		<vxe-table ref="tableRef" border align="center" :loading="loading" :data="tableData">
			<vxe-column type="checkbox" width="60"></vxe-column>
			<vxe-column title="标题" min-width="150">
				<template #default="{ row }">
					<el-link :href="`/pages/index/detail?id=${row._id}`" target="_blank">{{row.title}}</el-link>
				</template>
			</vxe-column>
			<vxe-column field="categorys" title="分类" :formatter="formatArr"></vxe-column>
			<vxe-column field="labels" title="标签" :formatter="formatArr"></vxe-column>
			<vxe-column field="page_view" title="浏览量"></vxe-column>
			<vxe-column field="sort" title="排序" width="80"></vxe-column>
			<vxe-column title="缩略图" width="100">
				<template #default="{ row }">
					<el-image v-if="row.thumbnail" style="width: 50px; height: 50px" :src="row.thumbnail" :preview-src-list="[row.thumbnail]" />
				</template>
			</vxe-column>
			<vxe-column field="created_date" title="发布日期" formatter="formatDate"></vxe-column>
			<vxe-column field="updated_date" title="更新时间" formatter="formatDate"></vxe-column>
			<vxe-column field="status" title="状态" type="html" :formatter="formatStatus" width="100"></vxe-column>
			<vxe-column title="操作" fixed="right" width="100">
				<template #default="{ row }">
					<el-button v-if="isDel" @click="back(row)" plain size="small">还原</el-button>
					<el-button v-else @click="edit(row._id)" plain size="small" type="primary">编辑</el-button>
				</template>
			</vxe-column>
		</vxe-table>
		<vxe-pager @page-change="pageChange" v-model:current-page="params.currentPage" v-model:page-size="params.pageSize" :total="params.total" :layouts="['PrevPage', 'Number', 'NextPage', 'FullJump', 'Total']" />
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { ElMessageBox } from 'element-plus'
	import call from '@/utils/call.js'
	import router from '@/utils/router.js'
	import toast from '@/utils/toast.js'

	// 定义参数
	const initParams = {
		currentPage: 1,
		pageSize: 10,
		total: 0,
		fidld: { user_id: false, abstract: false, password: false, content: false, html: false }, // 过滤字段
	}
	const tableData = ref([]) // 文章列表
	const params = ref({ ...initParams })

	const isDel = ref(false) // 是否获取回收站中的数据
	const setIsDel = val => {
		isDel.value = val
		initList()
	}

	const loading = ref(false)
	const getList = () => {
		loading.value = true
		call('getPosts', { ...params.value, is_del: isDel.value }).then(res => {
			tableData.value = res.data.list
			if (params.value.currentPage === 1) {
				params.value.total = res.data.total
			}
			loading.value = false
		})
	}
	getList()

	// 格式化标签
	const formatArr = ({ cellValue }) => {
		return cellValue.join('，')
	}

	// 格式化状态
	const formatStatus = ({ cellValue }) => {
		return cellValue === 1 ? '<text style="color: #67C23A">已发布</text>' : '<text style="color: #E6A23C">草稿箱</text>'
	}

	// 点击分页
	const pageChange = () => {
		getList()
	}

	// 重新获取数据
	const initList = () => {
		tableData.value = []
		params.value = { ...initParams }
		getList()
	}

	// 获取选中
	const tableRef = ref()
	const del = row => {
		let checkboxRecords
		if (row) {
			checkboxRecords = [row]
		} else {
			checkboxRecords = tableRef.value.getCheckboxRecords()
		}
		let length = checkboxRecords.length
		if (length > 0) {
			let ids = checkboxRecords.map(i => {
				return i._id
			})
			ElMessageBox.confirm(`确定要删除这 ${length} 项吗？`, `${!isDel.value ? '加入回收站' : '彻底删除！！！'}`, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error',
			}).then(() => {
				if (loading.value) { return }
				loading.value = true
				call('delPosts', { ids: ids, del: isDel.value }).then(res => {
					toast.success('删除成功')
					initList()
				}).catch(() => {
					loading.value = false
				})
			}).catch(() => {
				// 点击了取消
			})
		}
	}

	// 还原删除
	const back = row => {
		call('delPosts', { ids: [row._id], del: false, back: true }).then(res => {
			toast.success('还原成功')
			initList()
		})
	}

	// 编辑
	const edit = id => {
		router.redirectTo(`admin/writing?id=${id}`)
	}
</script>

<style lang="scss">
	.tools {
		margin-bottom: 20px;
	}
</style>
