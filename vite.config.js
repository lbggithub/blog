import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
	server: {
		port: '3002'
	},
	plugins: [
		uni(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
			imports: [
				'vue',
				{
					'@/utils/call': ['call'],
					'@/utils/router': ['router'],
					'@/utils/toast': ['toast']
				}
			]
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
	],
})
