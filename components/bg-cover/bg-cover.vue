<template>
	<!-- 全屏遮罩 -->
	<div v-if="show" @click="emit('click')" class="bg-cover" :style="{ top: top }"></div>
</template>

<script setup>
defineProps({
	show: Boolean,
	top: {
		type: Number,
		default: 0
	}
})

const emit = defineEmits(['click'])
</script>

<style lang="scss">
.bg-cover {
	position: fixed;
	top: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba($color: #000000, $alpha: 0.3);
	z-index: 222;
}
</style>
