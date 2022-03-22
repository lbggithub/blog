/**
 * 简单的封装 uniCloud.callFunction
 */
const API_ERROR = '网络请求异常，请稍后重试'
const authApi = ['addAttachments', 'addCategory', 'addLabel', 'addPosts', 'delAttachments', 'delCategorys', 'delLabels', 'delPosts', 'resetPwd']

/**
 * @param string name 云函数名称
 * @param object data 携带参数
 */
export function call(name = '', data = {}) {
	return new Promise((resolve, reject) => {
		if (uni.getStorageSync('userInfo').username !== 'admin' && authApi.indexOf(name) > -1) {
			toast.error('你没有权限哦～')
			reject()
			return
		}
		uniCloud.callFunction({
			name: name,
			data: data,
			success(res) {
				const { result } = res
				if (result.code === 0 || res.code === 0) {
					resolve(result)
				} else {
					toast.error(result.msg)
					reject(result.msg)
				}
			},
			fail(err) {
				toast.error(API_ERROR)
				reject(err)
			}
		})
	})
}
