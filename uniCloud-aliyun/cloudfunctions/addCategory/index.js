'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database().collection('categorys')
	
	if (!event.name) {
		return { msg: '分类名称不能为空', code: 1 }
	}
	
	// 避免重复，先删除试试	
	await db.where({ name: event.name }).remove()

	let res = await db.add({
		name: event.name,
		created_date: new Date().getTime(),
	})

	return { data: res, code: 0 }
}
