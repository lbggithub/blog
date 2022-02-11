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

	// 自动验证用户名是否  t与已经注册的用户名重复，如果重复会直接返回错误。否则会自动生成token并加密password存储username、password、token到数据表uni-id-users，并返回如上响应参数
	const res = await uniID.register({ //支持传入任何值，比如可以直接传入mobile即可设置手机号码，切勿直接传入event否则这是一个极大的安全问题
		username,
		password
	})
	return res
}
