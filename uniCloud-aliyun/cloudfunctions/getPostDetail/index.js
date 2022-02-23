'use strict';
exports.main = async function(event, context) {
	const db = uniCloud.database().collection('posts')

	let res = await db.where({ _id: event.id }).field(event.fidld).get()

	return { data: res.data[0], code: 0 }
}
