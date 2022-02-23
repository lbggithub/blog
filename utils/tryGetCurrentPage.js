/**
 * 不知道为什么，getCurrentPages() 在项目刚启动的时候很容易获取不到页面，出此下策
 */
function tryGetCurrentPage() {
	return new Promise(resolve => {
		setTimeout(() => {
			let pages = getCurrentPages()
			if (pages.length === 0) {
				resolve(null)
			} else {
				resolve(pages[pages.length - 1].route)
			}
		}, 100)
	})
}

export default tryGetCurrentPage
