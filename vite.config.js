import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import styleImport from 'vite-plugin-style-import'

export default defineConfig({
	server: {
		port: '3002'
	},
	plugins: [
		uni(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		styleImport({
			libs: [{
				libraryName: 'vxe-table',
				esModule: true,
				resolveComponent: (name) => `vxe-table/es/${name}`,
				resolveStyle: (name) => `vxe-table/es/${name}/style.css`
			}]
		})
	],
})
