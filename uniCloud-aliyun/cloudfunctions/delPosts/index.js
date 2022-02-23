'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	const payload = await uniID.checkToken(event.uniIdToken)
	if (payload.code) {
		return payload
	}

	const db = uniCloud.database()
	const dbCmd = db.command

	const dbc = db.collection('posts').where({ _id: dbCmd.in(event.ids) })
	let res
	if (event.del) {
		res = await dbc.remove() // 物理删除
	} else {
		res = await dbc.update({ is_del: event.back ? false : true }) // 软删除或者还原删除
	}

	return { data: res, code: 0 }
}
