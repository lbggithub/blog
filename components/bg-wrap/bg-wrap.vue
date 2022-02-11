<template>
	<n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN" abstract>
		<div class="bg-wrap" :style="{backgroundColor: theme === null ? '#ffffff' : '#18181c'}">
			<slot></slot>
			<div class="change-theme flex" @click="changeTheme">
				<n-icon size="20" color="#666666">
					<Moon v-if="theme === null" />
					<Sun v-else />
				</n-icon>
			</div>
		</div>
	</n-config-provider>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'
	import { NConfigProvider, darkTheme, NIcon, zhCN, dateZhCN } from 'naive-ui'
	import { Sun, Moon } from '@vicons/fa'

	const store = useStore()
	// 设置默认主题
	const theme = store.state.theme === 'dark' ? ref(darkTheme) : ref(null)
	// 改变主题
	const changeTheme = () => {
		if (theme.value) {
			theme.value = null
			store.commit('putTheme', 'light')
		} else {
			theme.value = darkTheme
			store.commit('putTheme', 'dark')
		}
	}
</script>

<style lang="scss">
	.bg-wrap {
		height: 100vh;

		.change-theme {
			position: fixed;
			bottom: 20px;
			right: 20px;
		}
	}
</style>
