<template>
	<bg-wrap>
		<n-spin :show="loading">
			<div class="login-wrap flex">
				<n-card embedded :title="needRegister ? '注册并自动登陆' : '登陆 blog'">
					<n-input v-model:value="form.username" placeholder="账号">
						<template #prefix>
							<n-icon>
								<User />
							</n-icon>
						</template>
					</n-input>
					<n-input v-model:value="form.password" type="password" show-password-on="mousedown" placeholder="密码">
						<template #prefix>
							<n-icon>
								<Lock />
							</n-icon>
						</template>
					</n-input>
					<template #footer>
						<n-button @click="submit">{{needRegister ? '注册' : '登陆'}}</n-button>
					</template>
				</n-card>
			</div>
		</n-spin>
	</bg-wrap>
</template>

<script setup>
	import { ref } from 'vue'
	import { NSpin, NCard, NInput, NButton, NIcon } from 'naive-ui'
	import { User, Lock } from '@vicons/fa'
	import call from '@/utils/call.js'
	import router from '@/utils/router.js'
	import toast from '@/utils/toast.js'

	const loading = ref(true)
	const form = ref({
		username: '', // 账号
		password: '' // 密码
	})
	const needRegister = ref(false) // 是否需要注册

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
			uni.setStorageSync('uni_id_token', res.token)
			// 用户赋值
			router.reLaunch('admin').then(() => {
				toast('登陆成功', 'success')
			})
		}).catch(err => {
			loading.value = false
		})
	}
</script>

<style lang="scss">
	.login-wrap {
		height: 100vh;
		padding-bottom: 10vh;

		.n-card {
			width: 320px;
			box-shadow: -4px 7px 46px 2px rgb(0 0 0 / 10%);
			border-radius: 5px;
			padding: 18px 28px 28px 28px;

			.n-button {
				width: 100%;
			}
		}

		.n-input:last-child {
			margin-top: 10px;
		}
	}
</style>
