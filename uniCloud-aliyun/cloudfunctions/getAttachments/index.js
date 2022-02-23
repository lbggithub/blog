'use strict';
exports.main = async function(event, context) {
	const db = uniCloud.database().collection('attachments')

	let total = 0
	if (event.currentPage === 1) {
		let count = await db.count()
		total = count.total
	}

	let res = await db
		.skip((event.currentPage - 1) * event.pageSize)
		.limit(event.pageSize)
		.orderBy('created_date', 'desc')
		.where({ name: new RegExp(event.inputValue) })
		.get()

	return { data: { list: res.data, total: total }, code: 0 }
}
