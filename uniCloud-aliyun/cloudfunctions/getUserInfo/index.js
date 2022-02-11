'use strict';
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const res = await uniID.checkToken(event.uniIdToken)

	return res
}
