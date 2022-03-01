<template>
	<div class="container">
		<div class="tools">
			<el-button v-if="isDel" @click="setIsDel(false)">返回</el-button>
			<el-button v-else @click="setIsDel(true)" type="warning">打开回收站</el-button>
			<el-button @click="del()" type="danger">删除选中</el-button>
			<el-button @click="initList" :icon="SyncAlt" circle style="float: right;" />
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" v-loading="loading" @selection-change="handleSelectionChange">
			<el-table-column type="selection" :width="55" />
			<el-table-column label="标题" :min-width="150">
				<template #default="scope">
					<el-link :href="`/pages/index/detail?id=${scope.row._id}`" target="_blank">{{scope.row.title}}</el-link>
				</template>
			</el-table-column>
			<el-table-column prop="categorys" label="分类" :formatter="arr"></el-table-column>
			<el-table-column prop="labels" label="标签" :formatter="arr"></el-table-column>
			<el-table-column prop="page_view" label="浏览量" :width="100" />
			<el-table-column prop="sort" label="排序" :width="70" />
			<el-table-column label="缩略图" :width="100">
				<template #default="scope">
					<el-image v-if="scope.row.thumbnail" :src="scope.row.thumbnail" :preview-src-list="[scope.row.thumbnail]" style="width: 50px; height: 50px" />
				</template>
			</el-table-column>
			<el-table-column prop="created_date" label="发布日期" :formatter="date" />
			<el-table-column prop="updated_date" label="更新时间" :formatter="date" />
			<el-table-column label="状态" :width="80">
				<template #default="scope">
					<el-tag type="success" v-if="scope.row.status === 1">已发布</el-tag>
					<el-tag type="warning" v-else>草稿箱</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" :width="80">
				<template #default="scope">
					<el-button v-if="isDel" @click="back(scope.row)" plain size="small">还原</el-button>
					<el-button v-else @click="edit(scope.row._id)" plain size="small" type="primary">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<bg-pagination v-model:pagination="pagination" @pageChange="getList" />
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { ElMessageBox } from 'element-plus'
	import { SyncAlt } from '@vicons/fa'
	import { date, arr } from '@/utils/formatter.js'
	import call from '@/utils/call.js'
	import router from '@/utils/router.js'
	import toast from '@/utils/toast.js'

	// 定义参数
	const tableData = ref([]) // 文章列表
	const pagination = ref({
		currentPage: 1,
		pageSize: 10,
		total: 0,
	})

	const isDel = ref(false) // 是否获取回收站中的数据
	const setIsDel = val => {
		isDel.value = val
		initList()
	}

	const loading = ref(false)
	const getList = () => {
		loading.value = true
		call('getPosts', {
			...pagination.value,
			is_del: isDel.value,
			fidld: { user_id: false, abstract: false, password: false, content: false, html: false },
		}).then(res => {
			tableData.value = res.data.list
			if (pagination.value.currentPage === 1) {
				pagination.value.total = res.data.total
			}
			loading.value = false
		})
	}
	getList()

	// 重新获取数据
	const initList = () => {
		tableData.value = []
		pagination.value.currentPage = 1
		pagination.value.total = 0
		getList()
	}

	// 获取选中，删除选中
	let checkboxRecords = []
	const handleSelectionChange = rows => {
		checkboxRecords = rows
	}
	const del = () => {
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
