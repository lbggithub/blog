<template>
	<bg-wrap>
		<n-layout has-sider>
			<n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="200" :collapsed="collapsed" @collapse="changeCollapse(true)" @expand="changeCollapse(false)">
				<n-menu v-model:value="activeKey" :collapsed-width="64" :collapsed-icon-size="22" :collapsed="collapsed" :options="menuOptions" @update:value="change" />
			</n-layout-sider>
			<n-layout-content>
				<!-- 头部 -->
				<admin-header />
				<!-- 注入动态组件 -->
				<template v-for="item in menuOptions">
					<n-card :bordered="false" v-if="activeKey === item.key">
						<component :is="item.component"></component>
					</n-card>
				</template>
			</n-layout-content>
		</n-layout>
	</bg-wrap>
</template>

<script setup>
	import { defineAsyncComponent, ref, shallowRef } from 'vue'
	import { useStore } from 'vuex'
	import { NLayout, NLayoutContent, NLayoutSider, NMenu, NPageHeader, NCard } from 'naive-ui'
	import { GrinTongueWink, ListAlt, PenAlt } from '@vicons/fa'
	import adminHeader from './components/adminHeader.vue'
	import call from '@/utils/call.js'
	import router from '@/utils/router.js'
	import renderIcon from '@/utils/renderIcon.js'

	const store = useStore()
	const menuOptions = shallowRef([])
	const activeKey = ref('')
	const collapsed = ref(uni.getStorageSync('collapsed') || false)

	// 获取用户信息
	call('getUserInfo').then(res => {
		if (res.token) {
			uni.setStorageSync('uni_id_token', token) // token即将过期，替换新的
		}
		// 菜单赋值
		menuOptions.value = [{
			label: '首页',
			key: 'index',
			icon: renderIcon(GrinTongueWink),
			component: defineAsyncComponent(() => import(`./views/index.vue`))
		}, {
			label: '文章列表',
			key: 'posts',
			icon: renderIcon(ListAlt),
			component: defineAsyncComponent(() => import(`./views/posts.vue`))
		}, {
			label: '写文章',
			key: 'writing',
			icon: renderIcon(PenAlt),
			component: defineAsyncComponent(() => import(`./views/writing.vue`))
		}]
		activeKey.value = uni.getStorageSync('activeKey') || menuOptions.value[0].key // 选择菜单的第一项

		// 用户赋值
		store.commit('putUserInfo', {
			username: res.userInfo.username,
		})
	}).catch(err => {
		router.reLaunch('login')
	})

	const change = key => {
		activeKey.value = key
		uni.setStorageSync('activeKey', activeKey.value)
	}

	const changeCollapse = value => {
		collapsed.value = value
		uni.setStorageSync('collapsed', collapsed.value)
	}

	// 获取屏幕宽度
	const windowWidth = uni.getSystemInfoSync().windowWidth
	if (windowWidth < 600) { collapsed.value = true }
</script>

<style lang="scss">
	.n-layout {
		height: 100vh;
	}
</style>
