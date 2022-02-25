<template>
	<div class="right-window">
		<!-- 头部 -->
		<div class="slogen">
			<span class="title">西梁的 Blog .</span>
			<span class="desc">专注用最简单的方式实现全栈开发</span>
		</div>
		<!-- 分类 -->

		<!-- 标签 -->

		<!-- 底部 -->
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'

	// 获取分类数据、标签数据
	const store = useStore() // 在窗体里不可以直接访问云函数，所以使用 vuex 来管理
	if (store.state.labels.length + store.state.categorys.length === 0) {
		store.dispatch('getCategorys')
		store.dispatch('getLabels')
	}
</script>

<style lang="scss">
	.right-window {
		height: 100vh;
		background-color: #fcfcfc;
		padding-top: 50px;

		.slogen {
			display: flex;
			flex-direction: column;
			padding: 50px 20px;
			background-color: rgba($color: #daebff, $alpha: 0.2);
			border-left: 4px solid #7abbff;

			.title {
				font-size: 21px;
				font-weight: bold;
			}

			.desc {
				font-size: 16px;
				margin-top: 8px;
				color: #999999;
			}
		}
	}
</style>
