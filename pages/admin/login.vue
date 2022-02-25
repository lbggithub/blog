<template>
	<div class="login-wrap">
		<el-card>
			<template #header>
				<span>{{needRegister ? '注册并自动登陆' : '登陆 blog'}}</span>
			</template>
			<el-input v-model="form.username" placeholder="账号"></el-input>
			<el-input v-model="form.password" type="password" placeholder="密码"></el-input>
			<el-button type="primary" :loading="loading" :disabled="disabled" @click="submit">{{needRegister ? '注册' : '登陆'}}</el-button>
		</el-card>
	</div>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { useStore } from 'vuex'
	import call from '@/utils/call.js'
	import router from '@/utils/router.js'
	import toast from '@/utils/toast.js'

	const store = useStore()

	const loading = ref(true)
	const form = ref({
		username: '', // 账号
		password: '' // 密码
	})
	const needRegister = ref(false) // 是否需要注册

	const disabled = computed(() => {
		return !form.value.username || !form.value.password
	})

	// 获取user表中的第一条账号信息，用于判断是否需要注册
	call('getUserName').then(res => {
		if (res.username) {
			form.value.username = res.username
		} else {
			needRegister.value = true // 无账号，开启注册
		}
		loading.value = false
	})

	const submit = async () => {
		if (loading.value) { return }
		loading.value = true
		await login()
	}

	const login = () => {
		call(needRegister.value ? 'register' : 'login', form.value).then(res => {
			uni.setStorageSync('uni_id_token', res.token) // 存储 token
			uni.setStorageSync('uni_id_token_expired', res.tokenExpired)
			// 存储用户信息
			store.commit('putUserInfo', {
				username: res.username
			})
			router.reLaunch('admin/index').then(() => {
				toast.success('登陆成功')
			})
		}).catch(err => {
			loading.value = false
		})
	}
</script>

<style lang="scss">
	page {
		background: #F8F8F8;
	}

	.login-wrap {
		padding-top: 30vh;

		.el-card {
			width: 320px;
			opacity: 0.95;
			margin: 0 auto;
		}

		.el-input {
			margin-bottom: 20px;
		}

		.el-button {
			width: 100%;
		}
	}
</style>
