const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		username,
		password
	} = event

	if (!username || !password) {
		return {
			code: 401,
			msg: '账号或密码不能为空'
		}
	}

	// 自动完成username、password验证是否合法的逻辑
	const res = await uniID.login({
		username,
		password,
		queryField: ['username']
	})
	return res
}
