<template>
	<div class="right-window">
		<!-- 头部 -->
		<div class="site">
			<span class="name">{{siteName}} .</span>
			<span class="desc">{{siteDesc}}</span>
		</div>
		<!-- 分类 -->

		<!-- 标签 -->

		<!-- 底部 -->
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'
	import { siteName, siteDesc } from '@/config/site.js'

	const store = useStore()
</script>

<style lang="scss">
	.right-window {
		height: 100vh;
		background-color: #fcfcfc;
		padding-top: 50px;

		.site {
			display: flex;
			flex-direction: column;
			padding: 50px 20px;
			background-color: rgba($color: #daebff, $alpha: 0.2);
			border-left: 4px solid #7abbff;

			.name {
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
