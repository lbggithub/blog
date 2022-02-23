'use strict';
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const payload = await uniID.checkToken(event.uniIdToken)
	if (payload.code) {
		return payload
	}

	if (event.password.length < 3) {
		return { code: 401, msg: '密码长度不能小于3' }
	}

	const res = await uniID.resetPwd({
		uid: payload.uid,
		password: event.password
	})
	return res
}
