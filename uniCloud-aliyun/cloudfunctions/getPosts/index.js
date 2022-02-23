'use strict';
exports.main = async function(event, context) {
	const db = uniCloud.database()
	const dbCmd = db.command

	let total = 0
	if (event.currentPage === 1) {
		let count = await db.collection('posts').count()
		total = count.total
	}
	
	let res = await db
		.collection('posts')
		.skip((event.currentPage - 1) * event.pageSize)
		.limit(event.pageSize)
		.orderBy('updated_date', 'desc')
		.field(event.fidld)
		.where({ is_del: event.is_del || false }) // 是否获取已经删除的文章
		.get()

	return { data: { list: res.data, total: total }, code: 0 }
}
