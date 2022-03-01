<template>
	<el-menu :default-active="activeKey" @select="handleSelect">
		<el-menu-item index="index">
			<span class="menu-name">首页</span>
		</el-menu-item>
		<el-menu-item v-for="item in store.state.categorys" :index="item.name">
			<span class="menu-name">{{item.name}}</span>
		</el-menu-item>
	</el-menu>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'
	import router from '@/utils/router.js'

	const store = useStore()
	const emit = defineEmits(['select'])

	const activeKey = ref('index')
	const handleSelect = key => {
		emit('select')
	}
</script>

<style lang="scss">
	.el-menu-item {
		.menu-name {
			font-size: 16px;
		}

		&.is-active,
		&:hover {
			color: #409eff;
			background: rgba($color: #daebff, $alpha: 0.2);
		}
	}
</style>
