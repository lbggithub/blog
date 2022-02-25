<template>
	<div class="bg-upload">
		<!-- 上传按钮 -->
		<el-button type="primary" @click="upload" :loading="loading">上传图片</el-button>
		<!-- 进度弹窗 -->
		<el-dialog v-model="showModal" :width="480" title="上传进度" center destroy-on-close>
			<div class="upload-image-box" v-for="image in images">
				<el-image style="width: 60px;" :src="image.path" />
				<div class="upload-image-progress">
					<span class="image-name line-1">{{image.name}}</span>
					<el-progress :percentage="image.progress" status="success" />
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
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
					toast.success('上传成功')
				})
			},
			fail() {
				toast.error('上传失败')
			},
			complete() {
				loading.value = false
			}
		})
	}
</script>

<style lang="scss">
	.upload-image-box {
		display: flex;
		align-items: center;
		margin-bottom: 12px;

		.upload-image-progress {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			margin-left: 20px;

			.image-name {
				width: 300px;
			}
		}
	}
</style>
