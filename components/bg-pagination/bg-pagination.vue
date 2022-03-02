<template>
	<el-pagination
		:currentPage="props.pagination.currentPage"
		@update:currentPage="pageChange"
		:pageSize="props.pagination.pageSize"
		:total="props.pagination.total"
		layout="prev, pager, next"
		background
	/>
</template>

<script setup>
// 双向绑定 v-model:pagination
const props = defineProps({
	pagination: Object
})
const emit = defineEmits(['update:pagination', 'pageChange'])

const pageChange = e => {
	emit('update:pagination', {
		...props.pagination,
		currentPage: e
	})
	emit('pageChange')
}
</script>

<style lang="scss">
.el-pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 30px;
}
::v-deep .btn-next,
::v-deep .btn-prev {
	min-width: 32px;
	min-height: 32px;
	border: none;
}
::v-deep .active {
	background: #66b1ff !important;
}
</style>
