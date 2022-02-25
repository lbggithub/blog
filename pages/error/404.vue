<template>
	<div class="nothing-page">
		<el-empty description="你是不是走错了，这里什么都没有" :image-size="200">
			<el-button round @click="router.redirectTo('index/index')">回首页看看</el-button>
		</el-empty>
	</div>
</template>

<script setup>
	import router from '@/utils/router.js'
</script>

<style>
	.nothing-page {
		height: 80vh;
		display: flex;
		align-content: center;
		justify-content: center;
	}
</style>
