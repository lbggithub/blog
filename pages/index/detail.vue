<template>
	<div class="main">
		<div class="main-max-width detail-wrap">
			<!-- 标题 -->
			<span class="title">{{ detail.title }}</span>
			<!-- 创建时间和浏览量 -->
			<itemOther v-if="!loading" class="detail-other" :created_date="detail.created_date" :page_view="detail.page_view" />
			<!-- 内容 -->
			<div v-html="detail.html" class="markdown-body content"></div>
			<!-- 分类和标签 -->
			<div class="tag-box">
				<el-tag @click="clickTag('category', item)" v-for="item in detail.categorys">{{ item }}</el-tag>
				<el-tag @click="clickTag('label', item)" v-for="item in detail.labels" type="success">{{ item }}</el-tag>
			</div>
			<el-backtop :visibility-height="400" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import itemOther from './components/itemOther.vue'
import call from '@/utils/call.js'
import router from '@/utils/router.js'

onLoad(options => {
	getDetail(options.id)
})

const detail = ref({})
const loading = ref(false)
const getDetail = id => {
	loading.value = true
	call('getPostDetail', {
		id: id,
		fidld: { password: false, content: false } // 过滤参数
	}).then(res => {
		loading.value = false
		detail.value = res.data
	})
}

const clickTag = (tag, name) => {
	router.redirectTo(`index/index?${tag}=${name}`)
}
</script>

<style lang="scss">
.detail-wrap {
	display: flex;
	flex-direction: column;
	max-width: 968px;
	padding: 10px 0 10px;
	position: relative;
	.title {
		font-size: 22px;
		line-height: 32px;
		font-weight: bold;
		user-select: text;
	}
	.detail-other {
		margin-top: 10px;
	}
	.content {
		margin-top: 22px;
	}
	.tag-box {
		display: flex;
		flex-wrap: wrap;
		margin: 20px 0;
		.el-tag {
			margin: 5px 10px 5px 0;
		}
	}
	.el-backtop {
		position: sticky !important;
		right: 0 !important;
		left: 15px !important;
		bottom: 10px !important;
	}
}
</style>
