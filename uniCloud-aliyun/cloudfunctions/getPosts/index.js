'use strict';
exports.main = async function(event, context) {
	const db = uniCloud.database()
	const dbCmd = db.command

	let total = 0
	if (event.currentPage === 1) {
		let count = await db.collection('posts').count()
		total = count.total
	}

	let where = {}
	if (event.is_del) {
		where.is_del = true // 是否获取已经删除的文章
	}
	if (event.status) {
		where.status = event.status // 根据状态获取
	}

	if (event.category && event.category !== '首页') {
		where.categorys = event.category // 根据分类获取
	}

	let res = await db
		.collection('posts')
		.skip((event.currentPage - 1) * event.pageSize)
		.limit(event.pageSize)
		.orderBy('updated_date', 'desc')
		.field(event.fidld)
		.where(where)
		.get()

	return { data: { list: res.data, total: total }, code: 0 }
}
