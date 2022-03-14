<template>
	<div>
		<!-- 右边菜单 -->
		<div class="right-window" :class="{ hide: !showMenu }">
			<!-- 头部 -->
			<div class="site">
				<span class="name">{{ siteName }}</span>
				<span class="desc">{{ siteDesc }}</span>
				<el-button @click="router.open(siteQQ)" :icon="Qq" circle size="small" />
			</div>
			<!-- 导航 -->
			<template v-if="store.categorys.length > 0">
				<el-divider content-position="left">导航</el-divider>
				<right-menu @select="select" :activeKey="activeKey" />
			</template>
			<!-- 标签 -->
			<template v-if="store.labels.length > 0">
				<el-divider content-position="left">标签</el-divider>
				<div class="tag-box">
					<el-tag @click="clickLabel(item.name)" :type="activeKey === item.name ? '' : 'info'" v-for="item in store.labels">{{ item.name }}</el-tag>
				</div>
			</template>
			<!-- 底部 -->
			<div class="footer">
				<a class="link" href="https://beian.miit.gov.cn/" target="_blank" type="primary">@{{ siteYear }} {{ siteNumber }}</a>
			</div>
		</div>
		<!-- 小屏幕显示菜单按钮 -->
		<match-media :max-width="768">
			<el-icon v-if="!showMenu" class="left-icon" color="#a6a6a6" :size="28"><ChevronCircleLeft @click="showRightMenu" /></el-icon>
		</match-media>
		<!-- 抽屉遮罩 -->
		<bg-cover :show="showCover && showMenu" :top="60" @click="showMenu = false" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/index.js'
import { ChevronCircleLeft, Qq } from '@vicons/fa'
import rightMenu from './components/rightMenu.vue'
import router from '@/utils/router.js'
import { siteName, siteDesc, siteYear, siteNumber, siteQQ } from '@/config/site.js'

const store = useStore()

uni.$on('setRightStyle', obj => {
	if (obj.type === 'showRightMenu') {
		showMenu.value = obj.data.showMenu
		showCover.value = obj.data.showCover
	}
	if (obj.type === 'putRightMenuActiveKey') {
		activeKey.value = obj.data
	}
})

const showMenu = ref(false)
const showCover = ref(false)
const activeKey = ref('')

const showRightMenu = () => {
	showMenu.value = true
	showCover.value = true
}

const select = () => {
	if (showCover.value) {
		showMenu.value = false
	}
}

const clickLabel = name => {
	showMenu.value = false
	router.redirectTo(`index/index?label=${name}`)
}
</script>

<style lang="scss">
.right-window {
	z-index: 333;
	position: fixed;
	top: 0;
	right: 0;
	width: 300px;
	height: 100vh;
	box-shadow: 0 0 10px 4px #999999;
	background-color: #fcfcfc;
	padding-top: 30px;
	transition: right 0.2s ease;
	display: flex;
	flex-direction: column;
	overflow: scroll;
	&.hide {
		right: -300px;
	}
	.el-divider {
		margin: 40px 0 30px;
	}
	.site {
		display: flex;
		flex-direction: column;
		padding: 50px 20px;
		background-color: rgba($color: #daebff, $alpha: 0.2);
		position: relative;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			box-shadow: 0 0 2px 2px #7abbff;
		}
		.el-button {
			position: absolute;
			top: 10px;
			right: 10px;
		}
		.name {
			font-size: 21px;
			color: #53a8ff;
		}
		.desc {
			font-size: 16px;
			margin-top: 8px;
			color: #999999;
		}
	}
	.tag-box {
		margin: 0 20px;
		display: flex;
		flex-wrap: wrap;
		.el-tag {
			cursor: pointer;
			margin: 10px 10px 0 0;
		}
	}
	.footer {
		flex-grow: 1;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		justify-content: center;
		padding: 30px 5px 10px;
		.link {
			text-decoration: none;
			color: #333333;
			font-size: 13px;
		}
	}
}
.left-icon {
	z-index: 99999;
	position: fixed;
	top: 0;
	right: 10px;
	height: 100vh;
	cursor: pointer;
	opacity: 0.6;
}
</style>
