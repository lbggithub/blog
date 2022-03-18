<template>
	<div class="nothing-page">
		<el-empty description="你是不是走错了，这里什么都没有" :image-size="200"><el-button round @click="goHome">回首页看看</el-button></el-empty>
	</div>
</template>

<script setup>
const goHome = () => {
	router.redirectTo('index/index')
}
</script>

<style>
.nothing-page {
	height: 80vh;
	display: flex;
	align-content: center;
	justify-content: center;
}
</style>
