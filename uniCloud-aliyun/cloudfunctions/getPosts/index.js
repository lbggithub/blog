'use strict';
exports.main = async function(event, context) {
	const db = uniCloud.database()
	const dbCmd = db.command

	let total = 0
	if (event.currentPage === 1) {
		let count = await db.collection('posts').count()
		total = count.total
	}

	let where = {
		is_del: event.is_del || false
	}
	if (event.status) {
		where.status = event.status // 根据状态获取
	}
	if (event.category && event.category !== '首页') {
		where.categorys = event.category // 根据分类获取
	}
	if (event.label) {
		where.labels = event.label // 根据标签获取
	}

	let res = await db
		.collection('posts')
		.skip((event.currentPage - 1) * event.pageSize)
		.limit(event.pageSize)
		.orderBy('sort', 'desc')
		.orderBy('created_date', 'desc')
		.field(event.fidld)
		.where(where)
		.get()

	return { data: { list: res.data, total: total }, code: 0 }
}
