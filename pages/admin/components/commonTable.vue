<template>
	<div class="container">
		<div class="tools">
			<el-button @click="del" type="danger">删除选中</el-button>
			<el-button @click="showAdd = true" type="primary">{{ `新增${props.title}` }}</el-button>
			<el-button @click="store[props.getApi]" :icon="SyncAlt" circle style="float: right;" />
		</div>
		<el-table :data="store[props.data]" @selection-change="handleSelectionChange" style="width: 100%">
			<el-table-column type="selection" width="55" />
			<el-table-column prop="name" :label="`${props.title}名称`" />
			<el-table-column prop="created_date" label="创建日期" :formatter="date" />
		</el-table>
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
import { useStore } from '@/stores/index.js'
import { ElMessageBox } from 'element-plus'
import { SyncAlt } from '@vicons/fa'
import { date } from '@/utils/formatter.js'
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

const showAdd = ref(false) // 打开弹窗

const name = ref('')
let loading = false // 防止多次点击

const submit = () => {
	if (loading) {
		return
	}
	loading = true
	showAdd.value = false
	call(props.addApi, { name: name.value })
		.then(res => {
			store[props.getApi]()
			name.value = ''
			toast.success('保存成功')
			loading = false
		})
		.catch(() => {
			loading = false
		})
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
		ElMessageBox.confirm(`确定要删除这 ${length} 项吗？`, `彻底删除！！！`, {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'error'
		})
			.then(() => {
				if (loading) {
					return
				}
				loading = true
				call(props.delApi, { ids: ids })
					.then(res => {
						store[props.getApi]()
						toast.success('删除成功')
						loading = false
					})
					.catch(() => {
						loading = false
					})
			})
			.catch(() => {
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
