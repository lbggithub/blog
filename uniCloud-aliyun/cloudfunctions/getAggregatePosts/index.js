'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()

	const $ = db.command.aggregate
	let res = await db
		.collection('posts')
		.aggregate()
		.group({
			_id: null,
			totalPageView: $.sum('$page_view')
		})
		.end()

	let count = await db.collection('posts').count()

	return { data: { ...res.data[0], total: count.total }, code: 0 }
}
