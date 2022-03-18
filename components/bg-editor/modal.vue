<template>
	<div @click="closeModal" class="modal" v-show="props.show">
		<div @click.stop class="modal-header" :style="{ width: props.width }">
			<span class="title">{{ props.title }}</span>
			<Icon @click="closeModal" color="#d8d8d8" :size="16"><Times /></Icon>
		</div>
		<div @click.stop class="modal-content" :style="{ width: props.width }"><slot></slot></div>
		<div @click.stop class="modal-footer" :style="{ width: props.width }">
			<div class="btn" @click.stop="close">{{ props.closeText || '取消' }}</div>
			<div class="btn" @click.stop="confirm">{{ props.confirmText || '确定' }}</div>
		</div>
	</div>
</template>

<script setup>
import { Icon } from '@vicons/utils'
import { Times } from '@vicons/fa'

const props = defineProps({
	show: String,
	width: {
		type: String,
		default: '30%'
	},
	title: String,
	confirmText: String,
	closeText: String
})

const emit = defineEmits(['update:show', 'confirm', 'close'])

const closeModal = () => {
	emit('update:show', '')
}

const close = () => {
	emit('close')
	closeModal()
}

const confirm = () => {
	emit('confirm')
	closeModal()
}
</script>

<style lang="scss">
.modal {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	touch-action: none;
	z-index: 99999;
	&-content {
		background: #ffffff;
	}
	&-header,
	&-footer {
		display: flex;
		aliitems: center;
		background: #ffffff;
	}
	&-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		border-radius: 5px 5px 0 0;
		border-bottom: 1px solid #e2e2e2;
		.title {
			font-size: 15px;
			font-weight: 600;
			color: #1a1a1a;
			word-break: keep-all;
		}
		.desc {
			margin-left: 15px;
			font-size: 12px;
			font-weight: 300;
			color: #666666;
		}
	}
	&-footer {
		justify-content: flex-end;
		padding: 15px;
		border-radius: 0 0 5px 5px;
		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 75px;
			height: 38px;
			padding: 7px 10px;
			font-size: 14px;
			color: #666;
			border: 1px solid #ddd;
			border-radius: 3px;
			cursor: pointer;
			transition: background 300ms ease-out;
			&:hover {
				background-color: #e2e2e2;
			}
			&:first-child {
				margin-right: 20px;
			}
		}
	}
}
</style>
