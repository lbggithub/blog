<template>
	<div class="main">
		<span class="navigation-name">{{ label || category }}</span>
		<div class="main-max-width post-list" v-loading="loading">
			<template v-if="list.length > 0">
				<postItem :item="item" v-for="item in list" @lock="lock" />
				<!-- 分页 -->
				<bg-pagination v-model:pagination="pagination" @pageChange="getList" />
			</template>
			<el-empty v-else-if="!loading" description="这里暂时没有数据～"></el-empty>
		</div>
		<!-- 加密文章输入密码弹框 -->
		<el-dialog v-model="showLock" title="这篇文章加密啦~" top="30vh" destroy-on-close>
			<el-input v-model="password" placeholder="请输入密码"></el-input>
			<template #footer>
				<el-button @click="showLock = false">取消</el-button>
				<el-button type="primary" :disabled="!password" @click="unlock">确认</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import postItem from './components/postItem.vue'
import { decode } from '@/utils/endeCode.js'

// 根据路由判断当前分类
const category = ref('')
const label = ref('')
onLoad(options => {
	category.value = options.category || '首页'
	label.value = options.label
	// 激活右边菜单
	uni.$emit('setRightStyle', {
		type: 'putRightMenuActiveKey',
		data: label.value || category.value
	})
	getList()
})

// 文章列表
const list = ref([])
// 分页参数
const pagination = ref({
	currentPage: 1,
	pageSize: 10,
	total: 0
})

const loading = ref(true)
const getList = () => {
	loading.value = true
	call('getPosts', {
		...pagination.value,
		category: category.value,
		label: label.value,
		fidld: { user_id: false, content: false, html: false }, // 过滤参数
		status: 1 // 只获取发布状态
	})
		.then(res => {
			loading.value = false
			list.value = res.data.list
			if (pagination.value.currentPage === 1) {
				pagination.value.total = res.data.total
			}
		})
		.catch(() => {
			loading.value = false
		})
}

// 加解密
const showLock = ref(false)
const password = ref('')
const currentItem = ref({})
const lock = item => {
	currentItem.value = item
	showLock.value = true
}
const unlock = () => {
	if (password.value === decode(currentItem.value.password)) {
		showLock.value = false
		router.navigateTo(`index/detail?id=${currentItem.value._id}`)
	} else {
		toast.error('密码不正确～')
	}
	password.value = ''
}
</script>

<style lang="scss">
.navigation-name {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	line-height: 30px;
}
.post-list {
	margin-top: 30px;
	padding-bottom: 20px;
	flex-grow: 1;
}
</style>
