<template>
	<div class="main">
		<span class="navigation-name">{{ label || category }}</span>
		<div class="post-list" v-loading="loading">
			<template v-if="list.length > 0">
				<postItem :item="item" v-for="item in list" />
				<!-- 分页 -->
				<bg-pagination v-model:pagination="pagination" @pageChange="getList" />
			</template>
			<el-empty v-else-if="!loading" description="这里暂时没有数据～"></el-empty>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import postItem from './components/postItem.vue'
import call from '@/utils/call.js'

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
</script>

<style lang="scss">
.navigation-name {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	line-height: 30px;
	font-weight: bold;
}
.post-list {
	max-width: 968px;
	margin-top: 30px;
	flex-grow: 1;
}
</style>
