'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database().collection('attachments')

	let res = await db.add(event)

	return { data: res, code: 0 }
}
