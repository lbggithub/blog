<template>
	<n-grid responsive="screen" cols="1 s:1 m:3 l">
		<n-gi v-for="item in statistics">
			<n-statistic :label="item.label" tabular-nums>
				<template #default>
					<n-number-animation :from="0" :to="item.value" :duration="1000" show-separator />
				</template>
				<template #prefix>
					<component :is="item.icon"></component>
				</template>
			</n-statistic>
		</n-gi>
	</n-grid>
</template>

<script setup>
	import { ref } from 'vue'
	import { NGrid, NGi, NStatistic, NNumberAnimation } from 'naive-ui'
	import { BookmarkRegular, EyeRegular, CalendarCheckRegular } from '@vicons/fa'
	import dayjs from 'dayjs'
	import renderIcon from '@/utils/renderIcon.js'
	import call from '@/utils/call.js'

	const statistics = ref([{
		label: '文章数',
		value: 0,
		icon: renderIcon(BookmarkRegular)
	}, {
		label: '总浏览量',
		value: 0,
		icon: renderIcon(EyeRegular)
	}, {
		label: '建立天数',
		value: 0,
		icon: renderIcon(CalendarCheckRegular)
	}])

	// 获取文章统计
	call('aggregatePosts').then(res => {
		statistics.value[0].value = res.data.total // 文章总数
		statistics.value[1].value = res.data.totalPageView // 总浏览量
		statistics.value[2].value = dayjs().diff('2019-7-22', 'day') // 计算相距天数
	})
</script>

<style lang="scss">
	.n-statistic {
		text-align: center;
		padding: 10px 0;
	}
</style>
