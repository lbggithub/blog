'use strict';
exports.main = async function(event, context) {
	const db = uniCloud.database()

	if (event.addPageView) {
		const dbCmd = db.command
		db.collection('posts').where({
			_id: event.id
		}).update({
			page_view: dbCmd.inc(1)
		})
	}

	let res = await db.collection('posts').where({ _id: event.id }).field(event.fidld).get()

	return { data: res.data[0], code: 0 }
}
