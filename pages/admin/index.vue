<template>
	<div class="container">
		<div class="statistics">
			<div v-for="item in statistics" class="box">
				<span class="label">{{item.label}}</span>
				<div class="value-box">
					<el-icon>
						<component :is="item.icon" />
					</el-icon>
					<span class="value">{{item.value}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { h, ref } from 'vue'
	import { BookmarkRegular, EyeRegular, CalendarCheckRegular } from '@vicons/fa'
	import dayjs from 'dayjs'
	import call from '@/utils/call.js'

	// 计算日期
	const date = dayjs(new Date()).diff(dayjs('2019-7-22'), 'day')

	const statistics = ref([{
		label: '文章数',
		value: '-',
		icon: h(BookmarkRegular)
	}, {
		label: '总浏览量',
		value: '-',
		icon: h(EyeRegular)
	}, {
		label: '建立距今',
		value: `${date} 天`,
		icon: h(CalendarCheckRegular)
	}])

	// 获取文章统计
	call('getAggregatePosts').then(res => {
		statistics.value[0].value = res.data.total // 文章总数
		statistics.value[1].value = res.data.totalPageView // 总浏览量
	})
</script>

<style lang="scss">
	.statistics {
		display: flex;
		justify-content: space-between;
	}

	.box {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 15px 0;

		.label {
			font-size: 16px;
		}

		.value-box {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.value {
				font-weight: bold;
				margin-left: 4px;
			}
		}
	}
</style>
