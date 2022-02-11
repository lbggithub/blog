'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database().collection('labels')

	// 避免重复，先删除试试	
	await db.where({
		name: event.name
	}).remove()

	let res = await db.add({
		name: event.name
	})

	return { data: res, code: 0 }
}
