<template>
	<div class="post-item" @click="toDetail">
		<div class="post-item-left">
			<span class="post-item-title">{{ props.item.title }}</span>
			<span class="post-item-abstract">{{ props.item.abstract }}</span>
		</div>
		<el-image v-if="props.item.thumbnail" class="post-item-thumbnail" :src="props.item.thumbnail" fit="fill" lazy></el-image>
		<itemOther class="post-item-other" :created_date="props.item.created_date" :page_view="props.item.page_view" />
	</div>
</template>

<script setup>
import router from '@/utils/router.js'
import itemOther from './itemOther.vue'

const props = defineProps({
	item: Object
})
const emit = defineEmits(['lock'])

const toDetail = () => {
	if (!props.item.password) {
		router.navigateTo(`index/detail?id=${props.item._id}`)
	} else {
		// 加密文章
		emit('lock', props.item)
	}
}
</script>

<style lang="scss">
.post-item {
	display: flex;
	justify-content: space-between;
	margin-bottom: 30px;
	padding-bottom: 50px;
	border-bottom: 1px solid #dcdfe6;
	cursor: pointer;
	position: relative;
	&-left {
		display: flex;
		flex-direction: column;
	}
	&-title {
		font-size: 20px;
		line-height: 30px;
		font-weight: bold;
	}
	&-abstract {
		font-size: 15px;
		line-height: 24px;
		margin-top: 6px;
	}
	&-other {
		position: absolute;
		bottom: 15px;
		left: 0;
	}
	&-thumbnail {
		max-width: 180px;
		max-height: 90px;
		min-width: 120px;
		min-height: 60px;
		border-radius: 4px;
		margin: 5px 0 0 30px;
	}
}
</style>
