<template>
	<div class="form-input-box">
		<span class="form-title">{{ props.title }}</span>
		<input class="form-input" type="text" :modelValue="props.input" @update:modelValue="emit('update:input', $event)" />
	</div>
</template>

<script setup>
const props = defineProps({
	input: String,
	title: String
})

const emit = defineEmits(['update:input'])
</script>

<style lang="scss">
.form-input-box {
	display: flex;
	align-items: center;
	margin-top: 10px;
	.form-title {
		width: 75px;
		color: #666;
		font-size: 14px;
	}
	.form-input {
		flex-grow: 1;
		color: #999;
		height: 38px;
		padding: 8px;
		border: 1px solid #ddd;
		font-size: 14px;
		border-radius: 4px;
	}
}
</style>
