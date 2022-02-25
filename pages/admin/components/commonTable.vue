<template>
	<div class="container">
		<div class="tools">
			<el-button @click="del" type="danger">删除选中</el-button>
			<el-button @click="showAdd = true" type="primary">{{`新增${props.title}`}}</el-button>
		</div>
		<vxe-table ref="tableRef" border align="center" :loading="loading" :data="store.state[props.data]">
			<vxe-column type="checkbox" width="60"></vxe-column>
			<vxe-column field="name" :title="`${props.title}名称`"></vxe-column>
			<vxe-column field="created_date" title="创建日期" formatter="formatDate"></vxe-column>
		</vxe-table>
		<!-- 新增弹窗 -->
		<el-dialog v-model="showAdd" :title="`新增${props.title}`">
			<el-input v-model="name" :placeholder="`在这里输入${props.title}名称`"></el-input>
			<template #footer>
				<el-button @click="showAdd = false">取消</el-button>
				<el-button type="primary" :disabled="!name" @click="submit">保存</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'
	import { ElMessageBox } from 'element-plus'
	import call from '@/utils/call.js'
	import toast from '@/utils/toast.js'

	const store = useStore() // 标签和分类都是用store管理，方便窗体获取

	const props = defineProps({
		title: String,
		data: String,
		getApi: String,
		addApi: String,
		delApi: String
	})

	const loading = ref(false) // 防止多次点击

	// 新增弹窗
	const showAdd = ref(false)
	const name = ref('')
	const submit = () => {
		if (loading.value) { return }
		loading.value = true
		showAdd.value = false
		call(props.addApi, { name: name.value }).then(res => {
			store.dispatch(props.getApi)
			name.value = ''
			toast.success('保存成功')
			loading.value = false
		}).catch(() => {
			loading.value = false
		})
	}

	// 获取选中，删除选中
	const tableRef = ref()
	const del = () => {
		let checkboxRecords = tableRef.value.getCheckboxRecords()
		let length = checkboxRecords.length
		if (length > 0) {
			let ids = checkboxRecords.map(i => {
				return i._id
			})
			ElMessageBox.confirm(`确定要删除这 ${length} 项吗？`, `彻底删除！！！`, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error',
			}).then(() => {
				if (loading.value) { return }
				loading.value = true
				call(props.delApi, { ids: ids }).then(res => {
					store.dispatch(props.getApi)
					toast.success('删除成功')
					loading.value = false
				}).catch(() => {
					loading.value = false
				})
			}).catch(() => {
				// 点击了取消
			})
		}
	}
</script>

<style lang="scss">
	.tools {
		margin-bottom: 20px;
	}
</style>
