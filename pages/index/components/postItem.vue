<template>
	<div class="post-item">
		<div class="post-item-left">
			<span class="post-item-title">{{ item.title }}</span>
			<span class="post-item-abstract">{{ item.abstract }}</span>
		</div>
		<el-image v-if="item.thumbnail" class="post-item-thumbnail" :src="item.thumbnail" fit="fill" lazy></el-image>
		<div class="post-item-other">
			<div class="other-item">
				<span class="other-item-text">{{ date(item.created_date) }}</span>
			</div>
			<div class="other-item">
				<el-icon color="#666666"><Eye /></el-icon>
				<span class="other-item-text">{{ item.page_view }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { Eye } from '@vicons/fa'
import { date } from '@/utils/formatter.js'

defineProps({
	item: Object
})
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
		display: flex;
		align-items: center;
		position: absolute;
		bottom: 15px;
		left: 0;
		.other-item {
			display: flex;
			align-items: center;
			margin-right: 20px;
			&-text {
				font-size: 15px;
				line-height: 15px;
				margin-left: 4px;
				color: #666666;
			}
		}
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
