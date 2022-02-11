<template>
	<n-card class="header-card">
		<div class="flex-sb">
			<n-gradient-text :size="18" type="success">Blog</n-gradient-text>
			<n-dropdown @select="handleSelect" :options="options" v-if="store.state.userInfo.username">
				<n-tag type="success">{{store.state.userInfo.username}}</n-tag>
			</n-dropdown>
		</div>
		<n-modal v-model:show="showPassword" preset="dialog" title="修改密码" positive-text="确认" negative-text="算了" @positive-click="submitCallback">
			<n-input style="margin: 20px 0 10px;" v-model:value="newPassword" type="password" show-password-on="mousedown" placeholder="输入新密码" />
		</n-modal>
	</n-card>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'
	import { NCard, NGradientText, NDropdown, NTag, NModal, NInput } from 'naive-ui'
	import { SignOutAlt, Expeditedssl } from '@vicons/fa'
	import call from '@/utils/call.js'
	import router from '@/utils/router.js'
	import toast from '@/utils/toast.js'
	import renderIcon from '@/utils/renderIcon.js'

	const store = useStore()

	const options = ref([{
		label: '修改密码',
		key: 'editPasswrod',
		icon: renderIcon(Expeditedssl)
	}, {
		label: '退出登录',
		key: 'logout',
		icon: renderIcon(SignOutAlt)
	}])

	const showPassword = ref(false)
	const newPassword = ref('')

	const f = {}
	f.editPasswrod = function() {
		showPassword.value = true
	}

	f.logout = function() {
		call('logout').then(() => { initLogin('登出成功') })
	}

	function handleSelect(key) {
		f[key]()
	}

	function initLogin(msg) {
		router.reLaunch('login').then(() => {
			uni.removeStorageSync('uni_id_token')
			toast(msg)
		})
	}

	function submitCallback() {
		const password = newPassword.value.trim()
		if (password) {
			call('resetPwd', { password: password }).then(() => {
				initLogin('密码修改成功，需要重新登陆')
			})
		}
		newPassword.value = ''
	}
</script>

<style lang="scss">
	.header-card {
		border-left: none;
		border-top: none;
		border-right: none;
	}
</style>
