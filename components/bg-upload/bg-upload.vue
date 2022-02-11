<template>
	<div class="bg-upload">
		<!-- 上传按钮 -->
		<n-button type="primary" @click="upload" :loading="loading">上传图片</n-button>
		<!-- 进度弹窗 -->
		<n-modal v-model:show="showModal">
			<n-card style="width: 480px;" title="上传进度" :bordered="false" size="huge">
				<div class="image-box flex-sb" v-for="image in images">
					<n-image width="60" :src="image.path" />
					<div class="progress">
						<span class="image-name line-1">{{image.name}}</span>
						<n-progress type="line" status="success" :percentage="image.progress" />
					</div>
				</div>
			</n-card>
		</n-modal>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { NButton, NModal, NProgress, NImage, NCard } from 'naive-ui'
	import call from '@/utils/call.js'
	import toast from '@/utils/toast.js'

	const showModal = ref(false)
	const images = ref([])

	const props = defineProps({
		count: {
			type: Number,
			default: () => 9
		}
	})
	const emit = defineEmits(['success'])

	const loading = ref(false)
	const upload = () => {
		uniCloud.chooseAndUploadFile({
			type: 'image',
			sizeType: 'compressed',
			count: props.count,
			onChooseFile(files) {
				loading.value = true
				// 选中文件后打开进度弹窗
				showModal.value = true
				images.value = files.tempFiles.map(i => {
					return {
						name: i.name,
						path: i.path,
						progress: 0
					}
				})
			},
			onUploadProgress(progress) {
				// 根据回掉动态改变当前进度值
				images.value[progress.index].progress = progress.loaded / progress.total * 100
			},
			success(res) {
				// 上传成功，记录入附件表中
				let attachments = res.tempFiles.map((i, index) => {
					return {
						url: i.url,
						name: i.name,
						size: i.size,
						type: i.type,
						fileType: i.fileType,
						cloudPath: i.cloudPath,
						created_date: new Date().getTime() + index,
					}
				})
				call('addAttachments', attachments).then(res => {
					showModal.value = false
					emit('success')
					toast('上传成功', 'success')
				})
			},
			fail() {
				toast('上传失败', 'error')
			},
			complete() {
				loading.value = false
			}
		})
	}
</script>

<style lang="scss">
	.image-box {
		margin-bottom: 12px;

		.progress {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 50px;
			margin-left: 20px;

			.image-name {
				width: 320px;
			}
		}
	}
</style>
