### 演示地址

0. #### 前台：[https://hrai.online](https://hrai.online)
1. #### 后台：[https://hrai.online/pages/admin/index](https://hrai.online/pages/admin/index) `账号：test 密码：123456`

### 安装

0. #### 从 HBuilder X 打开项目
1. #### HBuilder X 安装必须插件
	- ##### dart-sass 编译
	- ##### uniapp (Vue 3)
3. #### 打开 manifest.json 基础配置中重新获取你的 uni-app 应用标识(AppID)，如果是插件市场新建的项目应该不需要这一步
4. #### 依然是 manifest.json 基础配置中 “Vue版本选择” 选择 3（只支持vue3）
5. #### 依然是 manifest.json h5配置中 “路由模式” 选择 history
6. #### 安装依赖包 `npm install` or `yarn`
7. #### 鼠标右键 uniCloud 目录 -> 关联云服务空间或项目...，没有的话就自己建一个
	- ![unicloud-bind.png](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-775b05ec-1fa2-4d39-8a30-84020f49c6ee/812e3b6f-3252-4942-b044-cfc292a3e064.png)
8. #### 鼠标右键 uniCloud/cloudfunctions -> 上传所有云函数、公共模块及 actions，遇到弹窗都点 “确定” 就对了
	- ![cloudfunctions.png](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-775b05ec-1fa2-4d39-8a30-84020f49c6ee/1df27bf9-515c-43a1-a0d1-50f235063778.png)
9. #### 鼠标右键 uniCloud/database -> 上传所有DB Schema及扩展校验函数，遇到弹窗都点 “确定” 就对了
	- ![database.png](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-775b05ec-1fa2-4d39-8a30-84020f49c6ee/28476d0a-524e-42ae-8664-db551c4d0aee.png)
10. #### 为了你的博客账号，最好修改一下 uni-id 的用户密钥
	- ##### 找到这个文件：blog/uni_modules/uni-config-center/uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json
	- ##### 修改 passwordSecret 和 tokenSecret 的值

### 运行

0. #### HBuilder X -> 运行 -> 运行到指定浏览器
1. #### 一般会自动打开浏览器，或者自己打开 localhost:3002
2. #### 管理端登陆：localhost:3002/pages/admin/login
	- ##### 第一次打开会先让你注册账号
	- ##### 下次打开会自动填写账号，输入密码即可

### 发布

#### 我用的是前端网页托管，自己看文档吧：[https://uniapp.dcloud.io/uniCloud/hosting.html](https://uniapp.dcloud.io/uniCloud/hosting.html)

### 项目结构和说明(务必要看，这里有一些重要的东西)

0. #### uniCloud
	- ##### cloudfunctions - 云函数都写这这里
	- ##### database - 数据库初始化的时候用到，不是很重要
1. #### components - 公共组件目录，写在这里到组件都会自动引入
	- ##### bg-attachment - 附件库组件
	- ##### bg-cover - 全屏遮盖，不是很重要
	- ##### bg-editor - markdown 编辑器组件
	- ##### bg-pagination - 分页组件
	- ##### bg-upload - 上传文件组件
2. #### config - 一些配置文件
  - ##### menus.js - 后台菜单，添加菜单项要在这里写，用于鉴权用对
	- ##### site.js - 网站的一些描述，不是很重要
3. #### node_modules - 第三方依赖包
4. #### pages - 页面目录
	- ##### admin - 后台的所有页面都要写在这里
	- ##### error - 错误页，不是很重要
	- ##### index - 前台的所有页面都要写在这里
5. #### static - 一些静态资源文件
6. #### stores - pinia（轻量级的 vuex）
	- ##### 我用 pinia 代替了 vuex，它更快更小更方便：[https://pinia.vuejs.org/](https://pinia.vuejs.org/)
7. #### uni_modules - uni-id 用户体系：[https://uniapp.dcloud.io/uniCloud/uni-id.html#start](https://uniapp.dcloud.io/uniCloud/uni-id.html#start)
8. #### utils - 公共的方法库
	- ##### authToken.js - 登陆鉴权用的，基本不会去动它了，不是很重要
	- ##### call.js - 用于请求云函数的方法，基于 vite 的 AutoImport 插件做了自动引入，你在页面中直接使用 call().then() 就行，不需要 import 它
	- ##### endeCode.js - 简单的字符串加密和解密，用于实现加密文章，不是很重要
	- ##### formatter.js - 用于格式化表格数据的公共方法，如果你有其他常用的方法，也可以加进来
	- ##### router.js - 路由跳转，同 call 一样，做了自动引入，可直接使用 router.navigateTo()
	- ##### setClipboardData.js - 设置系统剪贴板的内容
	- ##### setWindowStyle.js - 根据屏幕宽度，隐藏或显示页面窗体（leftWindow，rightWindow）
	- ##### toast.js - 封装了 element 的 ElMessage 方法，也做了自动引入，可直接使用 toast.success()
	- ##### tryGetCurrentPage.js - 用于获取当前页面路径，不是很重要
9. #### windows - 页面窗体目录，原理：[https://uniapp.dcloud.io/tutorial/adapt.html](https://uniapp.dcloud.io/tutorial/adapt.html)
	- ##### leftWindow.vue - 左边窗体，用于后台菜单的显示以及一些公共方法的调用
	- ##### rightWindow.vue - 右边船体，用于前台导航的显示
	- ##### topWindow.vue - 顶部窗体，用于后台顶部导航的显示
10. #### App.vue - uni-app的主组件，onLaunch中写了一些初始化方法，style 里引入了一些公共样式
11. #### main.js - uni-app 的入口文件，主要作用是初始化vue实例、定义全局组件、使用需要的插件如 pinia
12. #### pages.json - 决定页面文件的路径、窗口样式
	- ##### pages 中定义前台页面路径
	- ##### subPackages 中定义后台台页面路径
	- ##### subPackages、topWindow、leftWindow 这三个只用于后台管理，如果你想分离前后端页面，缩小项目体积，可以把他们分出去
13. #### package.json - 这个不用说了
14. #### vite.config.js - vite 的配置文件
  - ##### 注意看 AutoImport 我把 vue 和一些常用的方法做了自动导入，你不需要在每个页面 `import { ref, watch } from 'vue'` 就可以直接使用这些方法，同理，你也可以在这里加上其他的方法

### 组件

1. #### 组件命名：大驼峰。exp: ComponentName。使用：`公共：<bg-name /> 页面：<componentName />`
2. #### 页面命名：小驼峰。exp: pageName
3. #### 组件目的：组件用来拆分代码逻辑和视图。即：组件要充分考虑能否把代码逻辑拆分掉，以减少页面的代码逻辑和交互，也方便组件的复用和后期的维护
4. #### 组件没有 slot 时使用单标签
5. #### 公用组件命名：bg-name
6. #### call、vue、router、toast 用 vite 插件自动引入了，不需要再每个组件下 import

### html

1. #### 尽力减少嵌套层次
2. #### html 缩进统一为 2 个空格
3. #### 尽量减少 tag 标签的换行
4. #### tag 换行后下一行缩进 2 个空格
5. #### class 名称链接用中线。exp：class-name
6. #### id 名称用驼峰。exp：idName
7. #### tag 尽量使用单标签

### css

1. #### 统一使用 scss 作为 css 预编译语言
2. #### css 尽量写在页面底部（不用外部引入的方式，除非 css 过长）
3. #### /static/css 中有通用的 css 样式及初始化样式，请先阅读
4. #### class、id 命名尽量语义明确且尽量短
5. #### 非必要不要使用 css 表达式，exp: calc()
6. #### 禁止使用内联样式
7. #### 尽量减少 css 的嵌套层级

### 使用 icon

#### 在 [https://www.xicons.org/#/](https://www.xicons.org/#/) 的 fa 目录中找到合适的 icon
```js 
import { Icon } from '@vicons/utils'
import { Apple } from '@vicons/fa'
```
```html
<Icon :size="16"><Apple /></Icon>
```
