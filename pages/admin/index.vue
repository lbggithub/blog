<template>
	<view class="container">
		<view class="statistics">
			<view v-for="item in statistics" class="box">
				<span class="label">{{item.label}}</span>
				<view class="value-box">
					<el-icon>
						<component :is="item.icon" />
					</el-icon>
					<span class="value">{{item.value}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { h, ref } from 'vue'
	import { BookmarkRegular, EyeRegular, CalendarCheckRegular } from '@vicons/fa'
	import XEUtils from 'xe-utils'
	import call from '@/utils/call.js'
	
	// 计算日期
	const diff = XEUtils.getDateDiff('2019-7-22', new Date())
	const date = `${diff.yyyy}年 ${diff.MM}月 ${diff.dd}日`
	
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
		value: date,
		icon: h(CalendarCheckRegular)
	}])

	// 获取文章统计
	call('aggregatePosts').then(res => {
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
