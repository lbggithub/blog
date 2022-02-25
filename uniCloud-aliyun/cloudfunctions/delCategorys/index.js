'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const dbCmd = db.command

	let res = await db.collection('categorys').where({ _id: dbCmd.in(event.ids) }).remove() // 物理删除
	return { data: res, code: 0 }
}
