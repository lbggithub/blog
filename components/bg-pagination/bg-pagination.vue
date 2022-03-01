<template>
	<el-pagination :currentPage="props.pagination.currentPage" @update:currentPage="pageChange" :pageSize="props.pagination.pageSize" :total="props.pagination.total" layout="prev, pager, next" />
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
		float: right;
		margin-top: 20px;
	}

	::v-deep .btn-next,
	::v-deep .btn-prev {
		min-width: 32px;
		min-height: 32px;
		border: none;
	}
</style>
