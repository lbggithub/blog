<template>
	<div class="top-window">
		<div class="top-window-left">
			<!-- 大屏幕显示 logo -->
			<div class="logo-box hidden-xs-only">
				<el-image style="width: 38px;height: 38px;margin-right: 8px;" src="/static/images/logo.png" fit="fill"></el-image>
				<span class="blog-name">{{siteName}}</span>
			</div>
			<!-- 小屏幕显示菜单按钮 -->
			<div class="hidden-sm-and-up menu-icon">
				<el-icon :size="18" @click="showMenu = true">
					<ThList />
				</el-icon>
			</div>
		</div>
		<div class="top-window-right">
			<!-- 右侧工具栏 -->
			<el-button v-for="item in tools" circle @click="router.open(item.url)">
				<el-icon>
					<component :is="item.icon" />
				</el-icon>
			</el-button>
			<!-- 用户信息 -->
			<el-dropdown :hide-timeout="75">
				<div class="username-box">
					<span class="username">{{store.state.userInfo.username}}</span>
					<el-icon color="#409eff">
						<AngleDown />
					</el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="showResetPwd = true">修改密码</el-dropdown-item>
						<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<!-- 菜单抽屉 -->
		<el-drawer v-model="showMenu" :with-header="false" :size="240" direction="ltr" destroy-on-close>
			<div class="muen-blog-name">
				<span class="blog-name">{{siteName}}</span>
			</div>
			<bg-menu @select="showMenu = false"></bg-menu>
		</el-drawer>
		<!-- 修改密码弹窗 -->
		<el-dialog v-model="showResetPwd" title="修改密码" top="30vh" destroy-on-close>
			<el-input v-model="newPassword" type="password" placeholder="输入新密码"></el-input>
			<template #footer>
				<el-button @click="showResetPwd = false">取消</el-button>
				<el-button type="primary" :disabled="!newPassword" :loading="loading" @click="resetPwd">确认</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
	import { h, ref } from 'vue'
	import { useStore } from 'vuex'
	import { Link, Github, AngleDown, ThList } from '@vicons/fa'
	import router from '@/utils/router.js'
	import { siteName } from '@/config/site.js'
	
	const store = useStore()

	const showMenu = ref(false) // 是否显示菜单
	const tools = [{
		url: '/pages/index/index',
		icon: h(Link)
	}, {
		url: 'https://github.com/lbggithub/blog',
		icon: h(Github)
	}]

	// 退出登陆
	const logout = () => {
		store.dispatch('logout')
	}

	// 修改密码
	const showResetPwd = ref(false)
	const newPassword = ref('')
	const loading = ref(false)
	const resetPwd = () => {
		loading.value = true
		store.dispatch('resetPwd', newPassword.value.trim()).then(() => {
			newPassword.value = ''
			showResetPwd.value = false
			loading.value = false
		})
	}
</script>

<style lang="scss">
	$border: 1px solid #e5e7eb;

	.top-window {
		display: flex;
		justify-content: space-between;
		height: 60px;
		border-bottom: $border;
		padding: 0 40px;
		background-color: #ffffff;

		.blog-name {
			font-size: 18px;
			font-weight: bold;
			color: #409eff;
		}

		.muen-blog-name {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 60px;
			width: 240px;
			border-bottom: $border;
		}

		::v-deep.el-drawer__body {
			padding: 0 !important;
		}

		.menu-icon {
			height: 60px;
			display: flex;
			align-items: center;
		}

		.logo-box {
			display: flex;
			align-items: center;
			height: 60px;
		}

		.top-window-right {
			flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			height: 60px;

			.username-box {
				display: flex;
				align-items: center;
				margin-left: 20px;

				.username {
					font-size: 16px;
					font-weight: bold;
					color: #409eff;
				}
			}
		}
	}
</style>
