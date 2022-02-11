/**
 * 简单的封装 uniCloud.callFunction
 */
import store from '@/store'
import toast from '@/utils/toast.js'

const API_ERROR = '网络请求异常，请稍后重试'

/**
 * @param string name 云函数名称
 * @param object data 携带参数
 */
function call(name = '', data = {}) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: name,
			data: data,
			success(res) {
				const { result } = res
				if (result.code === 0 || res.code === 0) {
					resolve(result)
				} else {
					toast(result.msg)
					reject(result.msg)
				}
			},
			fail(err) {
				toast(API_ERROR)
				reject(err)
			}
		})
	})
}

export default call
