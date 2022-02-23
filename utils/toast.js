const toast = {}

const methods = ['success', 'warning', 'info', 'error']
methods.forEach((item) => {
	toast[item] = (msg) => {
		uni.$emit('msg', {
			type: 'ElMessage',
			data: {
				message: msg,
				type: item
			}
		})
	}
})

export default toast
