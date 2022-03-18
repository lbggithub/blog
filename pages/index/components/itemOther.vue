<template>
	<div class="item-other">
		<div class="other-item">
			<span class="other-item-text">{{ date(created_date) }}</span>
		</div>
		<div class="other-item">
			<Icon color="#666666"><Eye /></Icon>
			<span class="other-item-text">{{ page_view }}</span>
		</div>
	</div>
</template>

<script setup>
import { Icon } from '@vicons/utils'
import { Eye } from '@vicons/fa'
import { date } from '@/utils/formatter.js'

defineProps({
	page_view: Number,
	created_date: Number
})
</script>

<style lang="scss">
.item-other {
	display: flex;
	align-items: center;
	.other-item {
		display: flex;
		align-items: center;
		margin-right: 20px;
		&-text {
			font-size: 14px;
			line-height: 15px;
			color: #666666;
		}
		.xicon {
			margin-right: 4px;
		}
	}
}
</style>
