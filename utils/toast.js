export const toast = {
	success: msg => {
		uni.$emit('msg', {
			type: 'ElMessage',
			data: {
				message: msg,
				type: 'success'
			}
		})
	},
	warning: msg => {
		uni.$emit('msg', {
			type: 'ElMessage',
			data: {
				message: msg,
				type: 'warning'
			}
		})
	},
	info: msg => {
		uni.$emit('msg', {
			type: 'ElMessage',
			data: {
				message: msg,
				type: 'info'
			}
		})
	},
	error: msg => {
		uni.$emit('msg', {
			type: 'ElMessage',
			data: {
				message: msg,
				type: 'error'
			}
		})
	},
}
