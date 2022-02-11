'use strict';
exports.main = async function(event, context) {
	const db = uniCloud.database().collection('attachments')

	let total = 0
	if (event.page === 1) {
		let count = await db.count()
		total = count.total
	}

	let res = await db
		.skip((event.page - 1) * event.pageSize)
		.limit(event.pageSize)
		.orderBy('created_date', 'desc')
		.where({ name: new RegExp(event.inputValue) })
		.get({ getCount: true })

	return { data: { list: res.data, total: total }, code: 0 }
}
